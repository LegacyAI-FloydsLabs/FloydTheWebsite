import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://floydslabs.com';

  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'Floyd MCP System API',
      description:
        'Floyd MCP backend system with 3 MCP servers hosting 67 tools for development operations, AI cognition, and multi-agent orchestration. Authenticate with shared password to access all endpoints.',
      version: '1.0.0',
      contact: {},
    },
    servers: [{ url: `${baseUrl}/api/mcp` }],
    tags: [
      { name: 'Authentication', description: 'Authentication endpoints' },
      { name: 'MCP Protocol', description: 'Model Context Protocol endpoints' },
      { name: 'Skills', description: 'Algorithmic skills management' },
      { name: 'System', description: 'Health check and metrics' },
    ],
    paths: {
      '/auth': {
        post: {
          operationId: 'AuthController_login',
          summary: 'Authenticate with shared password',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginDto' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Authentication successful',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LoginResponseDto' },
                },
              },
            },
            '401': { description: 'Invalid credentials' },
          },
        },
      },
      '/servers': {
        get: {
          operationId: 'McpController_listServers',
          summary: 'List all available MCP servers',
          tags: ['MCP Protocol'],
          security: [{ bearer: [] }],
          responses: { '200': { description: 'List of MCP servers' } },
        },
      },
      '/servers/{server}/tools': {
        get: {
          operationId: 'McpController_listTools',
          summary: 'List tools available on a specific server',
          tags: ['MCP Protocol'],
          security: [{ bearer: [] }],
          parameters: [
            {
              name: 'server',
              required: true,
              in: 'path',
              schema: {
                type: 'string',
                enum: ['floyd-core', 'ai-cognition', 'ai-orchestration'],
              },
            },
          ],
          responses: { '200': { description: 'List of tools' } },
        },
      },
      '/skills': {
        get: {
          operationId: 'SkillsController_listSkills',
          summary: 'List all available skills',
          tags: ['Skills'],
          security: [{ bearer: [] }],
          responses: { '200': { description: 'Array of skill objects' } },
        },
      },
      '/skills/{skillName}': {
        get: {
          operationId: 'SkillsController_getSkill',
          summary: 'Get detailed information about a specific skill',
          tags: ['Skills'],
          security: [{ bearer: [] }],
          parameters: [
            {
              name: 'skillName',
              required: true,
              in: 'path',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Skill details',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SkillInfoDto' },
                },
              },
            },
            '404': { description: 'Skill not found' },
          },
        },
      },
      '/skills/{skillName}/execute': {
        post: {
          operationId: 'SkillsController_executeSkill',
          summary: 'Execute a specific skill',
          tags: ['Skills'],
          security: [{ bearer: [] }],
          parameters: [
            {
              name: 'skillName',
              required: true,
              in: 'path',
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ExecuteSkillDto' },
              },
            },
          },
          responses: {
            '200': { description: 'Skill execution result' },
            '401': { description: 'Authentication required' },
            '404': { description: 'Skill not found' },
          },
        },
      },
      '/health': {
        get: {
          operationId: 'HealthController_healthCheck',
          summary: 'Health check endpoint',
          tags: ['System'],
          responses: { '200': { description: 'System is healthy' } },
        },
      },
      '/metrics': {
        get: {
          operationId: 'HealthController_getMetrics',
          summary: 'Get system metrics',
          tags: ['System'],
          responses: { '200': { description: 'System metrics' } },
        },
      },
    },
    components: {
      securitySchemes: {
        bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token obtained from /auth',
          in: 'header',
        },
      },
      schemas: {
        LoginDto: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              description: 'Shared password for Floyd MCP system authentication',
              example: 'FloydMCP2024!@#',
            },
          },
          required: ['password'],
        },
        LoginResponseDto: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT token for authenticated requests' },
            session: { type: 'object', description: 'Session information' },
          },
          required: ['token', 'session'],
        },
        SkillInfoDto: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            purpose: { type: 'string' },
            version: { type: 'string' },
            whenToUse: { type: 'string' },
            whenNotToUse: { type: 'string' },
            schema: { type: 'object' },
          },
          required: ['name', 'category', 'purpose', 'version', 'whenToUse', 'whenNotToUse', 'schema'],
        },
        ExecuteSkillDto: {
          type: 'object',
          properties: {
            input: { type: 'object', description: 'Input parameters for the skill' },
            metadata: { type: 'object', description: 'Additional metadata' },
          },
          required: ['input'],
        },
      },
    },
  };

  return NextResponse.json(spec, { headers: corsHeaders });
}
