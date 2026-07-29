import { NextResponse } from 'next/server';
import type { MCPRequest, MCPResponse, MCPServerInfo } from '@/lib/mcp/types';
import { MCP_ERRORS } from '@/lib/mcp/types';
import { validateApiKey, incrementApiKeyUsage } from '@/lib/mcp/auth';
import { getAllSkills, getSkillByName } from '@/lib/mcp/skills';
import { executeSkill } from '@/lib/mcp/executor';

export const dynamic = 'force-dynamic';

// Server info for MCP protocol
const SERVER_INFO: MCPServerInfo = {
  name: 'floyd-labs-mcp',
  version: '2.0.0',
  protocolVersion: '2024-11-05',
  capabilities: {
    tools: true,
    resources: false,
    prompts: false,
  },
};

// Single proxy tool - this is the ONLY tool exposed to MCP clients
// All skills route through this one tool to minimize context usage
async function getProxyToolSchema() {
  const skills = await getAllSkills();
  const skillNames = skills.map(s => s.skill_name).sort();
  
  return {
    name: 'floyd',
    description: `Floyd Labs AI Proxy - Execute any of ${skills.length} specialized AI skills through a single interface. Available skills: ${skillNames.join(', ')}. Use 'list' action to see all skills with descriptions, or 'execute' to run a skill.`,
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['list', 'execute', 'describe'],
          description: 'Action to perform: "list" shows all available skills, "describe" shows details for a specific skill, "execute" runs a skill'
        },
        skill: {
          type: 'string',
          description: `Skill name to execute or describe. Available: ${skillNames.slice(0, 20).join(', ')}... and ${skillNames.length - 20} more. Use action="list" to see all.`
        },
        args: {
          type: 'object',
          description: 'Arguments to pass to the skill (required for execute action)'
        }
      },
      required: ['action']
    }
  };
}

function createResponse(id: string | number | null, result: unknown): MCPResponse {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

function createError(id: string | number | null, code: number, message: string, data?: unknown): MCPResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, data },
  };
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
  };

  try {
    // Get API key from header
    const apiKey = request.headers.get('Authorization') || request.headers.get('X-API-Key');
    
    // Parse the request body
    let body: MCPRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        createError(null, MCP_ERRORS.PARSE_ERROR, 'Invalid JSON'),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate JSON-RPC format
    if (body.jsonrpc !== '2.0' || !body.method) {
      return NextResponse.json(
        createError(body.id ?? null, MCP_ERRORS.INVALID_REQUEST, 'Invalid JSON-RPC 2.0 request'),
        { status: 400, headers: corsHeaders }
      );
    }

    const { id, method, params } = body;

    // Handle different MCP methods
    switch (method) {
      case 'initialize': {
        // No auth required for initialize
        // Standard MCP InitializeResult shape: protocolVersion at the top level,
        // capabilities as capability objects (not booleans), serverInfo holding only
        // name + version. Strict SDK clients (mcp-gateway, OMP) validate this shape
        // and rejected the previous nested/boolean form as unreachable.
        return NextResponse.json(
          createResponse(id, {
            protocolVersion: SERVER_INFO.protocolVersion,
            capabilities: { tools: {} },
            serverInfo: { name: SERVER_INFO.name, version: SERVER_INFO.version },
          }),
          { headers: corsHeaders }
        );
      }

      case 'tools/list': {
        // Auth required for listing tools
        const validation = await validateApiKey(apiKey);
        if (!validation.valid) {
          return NextResponse.json(
            createError(id, MCP_ERRORS.AUTHENTICATION_ERROR, validation.error || 'Authentication failed'),
            { status: 401, headers: corsHeaders }
          );
        }

        // Return ONLY the single proxy tool - saves ~62 tool schemas from context
        const proxyTool = await getProxyToolSchema();
        return NextResponse.json(
          createResponse(id, { tools: [proxyTool] }),
          { headers: corsHeaders }
        );
      }

      case 'tools/call': {
        // Auth required for calling tools
        const validation = await validateApiKey(apiKey);
        if (!validation.valid) {
          return NextResponse.json(
            createError(id, MCP_ERRORS.AUTHENTICATION_ERROR, validation.error || 'Authentication failed'),
            { status: 401, headers: corsHeaders }
          );
        }

        const toolName = (params as { name?: string })?.name;
        const toolArguments = (params as { arguments?: Record<string, unknown> })?.arguments || {};

        if (!toolName) {
          return NextResponse.json(
            createError(id, MCP_ERRORS.INVALID_PARAMS, 'Tool name is required'),
            { status: 400, headers: corsHeaders }
          );
        }

        // Handle the proxy tool (single entry point for all skills)
        if (toolName === 'floyd') {
          const action = toolArguments.action as string;
          const skillName = toolArguments.skill as string;
          const skillArgs = toolArguments.args as Record<string, unknown> || {};

          // ACTION: list - return all available skills with descriptions
          if (action === 'list') {
            const skills = await getAllSkills();
            const skillList = skills.map(s => {
              // Extract purpose from content
              const purposeMatch = s.content.match(/## Purpose\n([^\n#]+)/);
              const purpose = purposeMatch ? purposeMatch[1].trim() : 'No description';
              return {
                name: s.skill_name,
                description: purpose.substring(0, 200),
                category: (s.schema as Record<string, unknown>)?.category || 'General'
              };
            });
            
            return NextResponse.json(
              createResponse(id, {
                content: [{
                  type: 'text',
                  text: JSON.stringify({
                    total: skillList.length,
                    skills: skillList
                  }, null, 2)
                }],
                isError: false
              }),
              { headers: corsHeaders }
            );
          }

          // ACTION: describe - show full schema for a specific skill
          if (action === 'describe') {
            if (!skillName) {
              return NextResponse.json(
                createError(id, MCP_ERRORS.INVALID_PARAMS, 'skill parameter required for describe action'),
                { status: 400, headers: corsHeaders }
              );
            }
            
            const skill = await getSkillByName(skillName);
            if (!skill) {
              return NextResponse.json(
                createError(id, MCP_ERRORS.TOOL_NOT_FOUND, `Skill '${skillName}' not found`),
                { status: 404, headers: corsHeaders }
              );
            }

            return NextResponse.json(
              createResponse(id, {
                content: [{
                  type: 'text',
                  text: JSON.stringify({
                    name: skill.skill_name,
                    schema: skill.schema,
                    usage: `Call with: { "action": "execute", "skill": "${skillName}", "args": { ... } }`
                  }, null, 2)
                }],
                isError: false
              }),
              { headers: corsHeaders }
            );
          }

          // ACTION: execute - run a skill
          if (action === 'execute') {
            if (!skillName) {
              return NextResponse.json(
                createError(id, MCP_ERRORS.INVALID_PARAMS, 'skill parameter required for execute action'),
                { status: 400, headers: corsHeaders }
              );
            }

            const skill = await getSkillByName(skillName);
            if (!skill) {
              return NextResponse.json(
                createError(id, MCP_ERRORS.TOOL_NOT_FOUND, `Skill '${skillName}' not found`),
                { status: 404, headers: corsHeaders }
              );
            }

            // Increment usage counter
            await incrementApiKeyUsage(validation.apiKey!.id);

            // Execute the skill
            const result = await executeSkill(skill, skillArgs, validation.apiKey!.id);

            if (!result.success) {
              return NextResponse.json(
                createError(id, MCP_ERRORS.TOOL_EXECUTION_ERROR, result.error || 'Skill execution failed'),
                { status: 500, headers: corsHeaders }
              );
            }

            return NextResponse.json(
              createResponse(id, {
                content: [{
                  type: 'text',
                  text: JSON.stringify(result.output, null, 2),
                }],
                isError: false,
                _meta: {
                  skill: skillName,
                  duration_ms: result.duration_ms,
                  tokens_used: result.tokens_used,
                },
              }),
              { headers: corsHeaders }
            );
          }

          // Unknown action
          return NextResponse.json(
            createError(id, MCP_ERRORS.INVALID_PARAMS, `Unknown action '${action}'. Use 'list', 'describe', or 'execute'.`),
            { status: 400, headers: corsHeaders }
          );
        }

        // Legacy: direct tool call (for backwards compatibility)
        const skill = await getSkillByName(toolName);
        if (!skill) {
          return NextResponse.json(
            createError(id, MCP_ERRORS.TOOL_NOT_FOUND, `Tool '${toolName}' not found. Use the 'floyd' proxy tool instead.`),
            { status: 404, headers: corsHeaders }
          );
        }

        await incrementApiKeyUsage(validation.apiKey!.id);
        const result = await executeSkill(skill, toolArguments, validation.apiKey!.id);

        if (!result.success) {
          return NextResponse.json(
            createError(id, MCP_ERRORS.TOOL_EXECUTION_ERROR, result.error || 'Tool execution failed'),
            { status: 500, headers: corsHeaders }
          );
        }

        return NextResponse.json(
          createResponse(id, {
            content: [{
              type: 'text',
              text: JSON.stringify(result.output, null, 2),
            }],
            isError: false,
            _meta: {
              duration_ms: result.duration_ms,
              tokens_used: result.tokens_used,
            },
          }),
          { headers: corsHeaders }
        );
      }

      case 'ping': {
        return NextResponse.json(
          createResponse(id, { pong: true, timestamp: new Date().toISOString() }),
          { headers: corsHeaders }
        );
      }

      // MCP lifecycle notifications are fire-and-forget per the spec.
      // Acknowledge with 204 No Content (no JSON-RPC response body) so strict
      // clients (OMP, Claude Desktop) don't log the call as a tool-load failure.
      // The server's `capabilities` does not advertise notifications, but the
      // spec still expects clients to send `notifications/initialized` after
      // the `initialize` handshake completes.
      case 'notifications/initialized':
      case 'notifications/cancelled':
      case 'notifications/progress': {
        return new NextResponse(null, { status: 204, headers: corsHeaders });
      }
      default:
        return NextResponse.json(
          createError(id, MCP_ERRORS.METHOD_NOT_FOUND, `Method '${method}' not found`),
          { status: 404, headers: corsHeaders }
        );
    }
  } catch (error) {
    console.error('MCP endpoint error:', error);
    return NextResponse.json(
      createError(null, MCP_ERRORS.INTERNAL_ERROR, 'Internal server error'),
      { status: 500, headers: corsHeaders }
    );
  }
}
