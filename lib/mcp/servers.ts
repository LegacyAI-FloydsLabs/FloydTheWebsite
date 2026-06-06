// MCP Server definitions - maps skills to virtual MCP servers

export interface MCPServer {
  name: string;
  version: string;
  description: string;
  capabilities: string[];
}

export const MCP_SERVERS: Record<string, MCPServer> = {
  'floyd-core': {
    name: 'floyd-core',
    version: '1.0.0',
    description: 'Development operations, code analysis, build tools, git operations',
    capabilities: ['code_analysis', 'build_automation', 'git_operations', 'testing'],
  },
  'ai-cognition': {
    name: 'ai-cognition',
    version: '1.0.0',
    description: 'AI reasoning, pattern recognition, context management',
    capabilities: ['pattern_extraction', 'semantic_analysis', 'knowledge_synthesis', 'context_management'],
  },
  'ai-orchestration': {
    name: 'ai-orchestration',
    version: '1.0.0',
    description: 'Multi-agent coordination, task management, resource allocation',
    capabilities: ['agent_coordination', 'task_management', 'resource_allocation', 'consensus_protocols'],
  },
};

// Explicit mapping of skills to servers (using underscore format to match tool names)
const FLOYD_CORE_TOOLS = new Set([
  'typescript_semantic_analyzer', 'monorepo_dependency_analyzer', 'build_error_correlator',
  'schema_migrator', 'benchmark_runner', 'secure_hook_executor', 'api_format_verifier',
  'git_bisect', 'dependency_hologram', 'failure_to_test_transmuter', 'trace_replay_debugger',
  'lab_inventory', 'tool_discovery', 'code_complexity_analyzer', 'test_coverage_mapper',
  'refactor_safety_checker', 'commit_impact_analyzer', 'code_smell_detector',
  'performance_profiler',
]);

const AI_COGNITION_TOOLS = new Set([
  'pattern_extraction', 'mit_analysis', 'concept_crystallization', 'pattern_matching',
  'pattern_synthesis', 'quality_scoring', 'context_packing', 'context_compression',
  'semantic_understanding', 'knowledge_synthesis', 'context_orchestration',
  'concept_web_analysis', 'knowledge_graph_building', 'cognitive_load_analysis',
  'attention_allocation', 'context_dependency_analysis', 'meta_cognitive_strategy',
  'context_scalability_analysis', 'context_persistence', 'reasoning_chain_builder',
  'abstraction_layer_analysis', 'mental_model_builder',
]);

const AI_ORCHESTRATION_TOOLS = new Set([
  'distributed_task_management', 'agent_communication', 'consensus_protocol',
  'swarm_intelligence', 'collective_decision_making', 'resource_allocation',
  'load_balancer', 'task_scheduler', 'agent_health_monitor', 'workflow_orchestrator',
  'conflict_resolver', 'priority_manager', 'capability_matcher', 'delegation_engine',
  'coordination_protocol', 'state_synchronizer', 'event_broadcaster', 'quorum_builder',
  'failure_detector', 'recovery_manager', 'performance_optimizer', 'scalability_analyzer',
  'bottleneck_detector', 'adaptive_strategy', 'meta_orchestrator',
  'emergent_behavior_detector',
]);

/**
 * Determine which server a skill belongs to.
 * DB stores skill names with hyphens (e.g. "build-error-correlator")
 * but the server mapping uses underscores (e.g. "build_error_correlator").
 */
export function getServerForSkill(skillName: string): string | null {
  const normalized = skillName.replace(/-/g, '_');
  if (FLOYD_CORE_TOOLS.has(normalized)) return 'floyd-core';
  if (AI_COGNITION_TOOLS.has(normalized)) return 'ai-cognition';
  if (AI_ORCHESTRATION_TOOLS.has(normalized)) return 'ai-orchestration';
  return null; // Skills not in any server (e.g. Ghost Algorithms, other categories)
}

/**
 * Get all skills that belong to a specific server.
 * Returns the set of normalized (underscore) tool names.
 */
export function getToolNamesForServer(serverName: string): Set<string> {
  switch (serverName) {
    case 'floyd-core': return FLOYD_CORE_TOOLS;
    case 'ai-cognition': return AI_COGNITION_TOOLS;
    case 'ai-orchestration': return AI_ORCHESTRATION_TOOLS;
    default: return new Set();
  }
}

export function isValidServer(name: string): boolean {
  return name in MCP_SERVERS;
}
