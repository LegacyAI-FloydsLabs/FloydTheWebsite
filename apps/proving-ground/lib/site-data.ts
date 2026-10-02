export type Accent = "cyan" | "pink" | "green" | "orange" | "purple";

export const stats = [
  { value: "73+", label: "Tools Built", accent: "cyan" as Accent },
  { value: "13", label: "MCP Servers", accent: "pink" as Accent },
  { value: "42,301+", label: "Lines of Code", accent: "green" as Accent },
  { value: "$0", label: "Subscriptions", accent: "orange" as Accent },
];

export const toolGroups = [
  {
    name: "floyd-core",
    count: 19,
    accent: "cyan" as Accent,
    description: "Development operations, code analysis, build tools, git operations.",
  },
  {
    name: "ai-cognition",
    count: 22,
    accent: "pink" as Accent,
    description: "AI reasoning, pattern recognition, context management, and knowledge synthesis.",
  },
  {
    name: "ai-orchestration",
    count: 26,
    accent: "green" as Accent,
    description: "Multi-agent coordination, task management, consensus, and resource allocation.",
  },
];

export const tools = [
  ["typescript-semantic-analyzer", "floyd-core", "Understands TypeScript structure, symbols, and relationships before touching code."],
  ["build-error-correlator", "floyd-core", "Finds the shared cause behind noisy, cascading build failures."],
  ["git-bisect-assistant", "floyd-core", "Narrows regressions to the commit that actually introduced them."],
  ["schema-migrator", "floyd-core", "Plans safer database schema changes and rollout steps."],
  ["dependency-auditor", "floyd-core", "Maps dependency risk, drift, and upgrade pressure."],
  ["test-gap-finder", "floyd-core", "Finds behavior that matters but is not covered by tests."],
  ["concept-crystallization", "ai-cognition", "Turns fuzzy ideas into precise concepts, constraints, and decisions."],
  ["pattern-synthesis", "ai-cognition", "Extracts recurring patterns from messy observations and source material."],
  ["knowledge-graph-building", "ai-cognition", "Connects people, concepts, facts, and evidence into a usable graph."],
  ["reasoning-chain-builder", "ai-cognition", "Builds inspectable reasoning paths for complex decisions."],
  ["context-window-optimizer", "ai-cognition", "Keeps the most useful context while shedding expensive noise."],
  ["semantic-drift-detector", "ai-cognition", "Flags when language quietly stops meaning what the team thinks it means."],
  ["swarm-intelligence", "ai-orchestration", "Coordinates specialist agents around a shared objective."],
  ["workflow-orchestrator", "ai-orchestration", "Routes dependent tasks and handles handoffs across a workflow."],
  ["conflict-resolver", "ai-orchestration", "Reconciles contradictory agent outputs and competing constraints."],
  ["emergent-behavior-detector", "ai-orchestration", "Surfaces useful or risky behavior no single agent was assigned."],
  ["resource-allocation-engine", "ai-orchestration", "Directs time, compute, and attention toward the highest-value work."],
  ["consensus-protocol", "ai-orchestration", "Produces a defensible team decision without pretending disagreement vanished."],
  ["bloom-sentinel", "ghost-algorithm", "Ghost Algorithm that watches for fragile concepts spreading through a system."],
  ["patch-oracle", "ghost-algorithm", "Ghost Algorithm that predicts the blast radius of a proposed patch."],
  ["token-alchemist", "ghost-algorithm", "Ghost Algorithm that compresses context without crushing its meaning."],
] as const;

export const apps = [
  {
    name: "Floyd CLI",
    tag: "Terminal",
    tagline: "The Original",
    status: "Available",
    accent: "cyan" as Accent,
    description: "The command-line agent with persistent memory, strong opinions, and zero corporate BS.",
    features: ["Persistent memory", "Multi-agent coordination", "Offline capable"],
  },
  {
    name: "Floyd Desktop",
    tag: "GUI",
    tagline: "Visual Layer",
    status: "Available",
    accent: "pink" as Accent,
    description: "A visual interface for people who hate CLIs but still love Floyd.",
    features: ["Visual workflows", "Desktop native", "Agent swarms"],
  },
  {
    name: "Floyd IDE",
    tag: "Code",
    tagline: "Code Whisperer",
    status: "Available",
    accent: "green" as Accent,
    description: "A code assistant that reviews your work without passive-aggression. Mostly.",
    features: ["Code review", "Style memory", "Refactoring assist"],
  },
  {
    name: "Floyd MCP Server",
    tag: "Infrastructure",
    tagline: "The Backbone",
    status: "Available",
    accent: "orange" as Accent,
    description: "The Model Context Protocol backbone running the skills ecosystem.",
    features: ["13 MCP servers", "73+ skills", "24/7 uptime"],
  },
  {
    name: "Floyd API Gateway",
    tag: "API",
    tagline: "REST Interface",
    status: "Beta",
    accent: "purple" as Accent,
    description: "A standard REST interface for integrating Floyd into your own applications.",
    features: ["OpenAPI spec", "Rate limits", "Auth tokens"],
  },
  {
    name: "Floyd Orchestrator",
    tag: "Multi-Agent",
    tagline: "The Herding Layer",
    status: "Coming Soon",
    accent: "cyan" as Accent,
    description: "Coordinates multiple Floyd agents working in parallel on difficult tasks.",
    features: ["Task distribution", "Agent coordination", "Workflow automation"],
  },
];

export { posts } from "./posts";
