// MCP Protocol Types (JSON-RPC 2.0 based)

export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: MCPError;
}

export interface MCPError {
  code: number;
  message: string;
  data?: unknown;
}

// MCP Error Codes
export const MCP_ERRORS = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  AUTHENTICATION_ERROR: -32000,
  RATE_LIMIT_ERROR: -32001,
  TOOL_NOT_FOUND: -32002,
  TOOL_EXECUTION_ERROR: -32003,
} as const;

// MCP Tool Definition
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

// MCP Server Info
export interface MCPServerInfo {
  name: string;
  version: string;
  protocolVersion: string;
  capabilities: {
    tools?: boolean;
    resources?: boolean;
    prompts?: boolean;
  };
}

// Skill from database
export interface SkillData {
  skill_name: string;
  content: string;
  schema: {
    inputSchema?: Record<string, unknown>;
    outputSchema?: Record<string, unknown>;
  };
  metadata: {
    version?: string;
    category?: string;
  } | null;
}
