import { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Zap, Code, Server, Key, ArrowRight, ExternalLink, Github, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Connect to MCP Server | Floyd Labs',
  description: 'Connect your LLM to Floyd Labs MCP server. 73 AI skills across 3 MCP servers, accessible via the Model Context Protocol and REST API.',
};

export default function ConnectPage() {
  const serverUrl = 'https://floydslabs.com/api/mcp';

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="glass-panel text-center mb-12 p-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid var(--floyd-accent-cyan)' }}
          >
            <Server className="w-4 h-4" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <span style={{ color: 'var(--floyd-accent-cyan)' }}>MCP Server Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
            Connect Your LLM to <span style={{ color: 'var(--floyd-accent-cyan)' }}>Floyd Labs</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-6" style={{ color: 'var(--floyd-text-muted)' }}>
            73 production-ready AI skills organized across 3 MCP servers. Access them via
            the JSON-RPC MCP protocol, the REST API, or interactive Swagger docs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/LegacyAI-FloydsLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: 'rgba(156,39,176,0.2)', border: '1px solid var(--floyd-glow-purple)', color: 'var(--floyd-text-body)' }}
            >
              <Github className="w-4 h-4" />
              GitHub Organization
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.LegacyAI.space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid var(--floyd-accent-cyan)', color: 'var(--floyd-accent-cyan)' }}
            >
              <Globe className="w-4 h-4" />
              LegacyAI.space
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* MCP Server Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--floyd-text-heading)' }}>
            3 MCP Servers • 67 Mapped Tools • 73 Total Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: 'floyd-core',
                tools: 19,
                color: 'var(--floyd-accent-cyan)',
                desc: 'Development operations, code analysis, build tools, git operations',
                capabilities: ['Code Analysis', 'Build Automation', 'Git Operations', 'Testing'],
                examples: ['typescript-semantic-analyzer', 'build-error-correlator', 'git-bisect', 'schema-migrator'],
              },
              {
                name: 'ai-cognition',
                tools: 22,
                color: 'var(--floyd-accent-pink)',
                desc: 'AI reasoning, pattern recognition, context management',
                capabilities: ['Pattern Extraction', 'Semantic Analysis', 'Knowledge Synthesis', 'Context Management'],
                examples: ['concept-crystallization', 'pattern-synthesis', 'knowledge-graph-building', 'reasoning-chain-builder'],
              },
              {
                name: 'ai-orchestration',
                tools: 26,
                color: 'var(--floyd-accent-green)',
                desc: 'Multi-agent coordination, task management, resource allocation',
                capabilities: ['Agent Coordination', 'Task Management', 'Resource Allocation', 'Consensus Protocols'],
                examples: ['swarm-intelligence', 'workflow-orchestrator', 'conflict-resolver', 'emergent-behavior-detector'],
              },
            ].map((server) => (
              <div key={server.name} className="floyd-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5" style={{ color: server.color }} />
                  <h3 className="font-bold font-mono" style={{ color: server.color }}>{server.name}</h3>
                </div>
                <div className="text-2xl font-black mb-2" style={{ color: server.color }}>{server.tools} tools</div>
                <p className="text-sm mb-3" style={{ color: 'var(--floyd-text-muted)' }}>{server.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {server.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: `${server.color}15`, color: server.color, border: `1px solid ${server.color}40` }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--floyd-text-muted)' }}>
                  {server.examples.map((ex, i) => (
                    <span key={ex}>{i > 0 ? ', ' : ''}{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-center mt-4" style={{ color: 'var(--floyd-text-muted)' }}>
            + 10 Ghost Algorithms (bloom-sentinel, clone-lens, concept-lattice, consensus-voter, grammar-gate,
            merge-engine, patch-oracle, refactor-pathfinder, token-alchemist, viterbi-resolver) and 6 standalone analysis skills.
          </p>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Skills', value: '73' },
            { label: 'MCP Servers', value: '3' },
            { label: 'Ghost Algorithms', value: '10' },
            { label: 'Cost', value: '$0' },
          ].map((stat, i) => (
            <div key={i} className="floyd-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two Access Methods */}
        <section className="glass-panel p-6 mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
            Two Ways to Access Floyd Labs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="floyd-card p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--floyd-accent-cyan)' }}>
                <Terminal className="w-5 h-5" /> MCP Protocol (JSON-RPC 2.0)
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--floyd-text-muted)' }}>
                Use the single-tool proxy pattern. Your LLM sees one tool ("floyd") that routes to all 73 skills.
                Context-efficient: 1 tool schema instead of 73.
              </p>
              <code className="text-xs font-mono" style={{ color: 'var(--floyd-accent-green)' }}>POST {serverUrl}</code>
            </div>
            <div className="floyd-card p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--floyd-accent-pink)' }}>
                <Code className="w-5 h-5" /> REST API + Swagger Docs
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--floyd-text-muted)' }}>
                Browse servers, list tools, execute skills, and check metrics via standard REST endpoints.
                Full interactive documentation available.
              </p>
              <Link href="/api-docs" className="text-xs font-mono inline-flex items-center gap-1" style={{ color: 'var(--floyd-accent-pink)' }}>
                Open API Docs <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Step 1: Get API Key */}
        <section className="floyd-card p-6 mb-6">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--floyd-accent-cyan)20', border: '1px solid var(--floyd-accent-cyan)' }}
            >
              <span className="font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>1</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>
                <Key className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-cyan)' }} />
                Get Your API Key
              </h2>
              <p className="mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                Request access to get your unique Floyd Labs API key. Keys support rate limiting and usage tracking.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
                style={{ background: 'var(--floyd-accent-cyan)', color: '#0a0510' }}
              >
                Request API Access
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Step 2: Configure Client */}
        <section className="floyd-card p-6 mb-6">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--floyd-accent-pink)20', border: '1px solid var(--floyd-accent-pink)' }}
            >
              <span className="font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>2</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>
                <Terminal className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-pink)' }} />
                Configure Your MCP Client
              </h2>
              <p className="mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                Add Floyd Labs to your MCP client configuration.
              </p>

              {/* Claude Desktop */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>Claude Desktop</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--floyd-text-muted)' }}>
                  Add to your Claude Desktop config file (<code className="px-1 rounded" style={{ background: 'var(--floyd-bg-tertiary)' }}>claude_desktop_config.json</code>):
                </p>
                <pre
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)' }}
                >
                  <code style={{ color: 'var(--floyd-accent-cyan)' }}>{`{
  "mcpServers": {
    "floyd-labs": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-proxy"],
      "env": {
        "MCP_PROXY_URL": "${serverUrl}",
        "MCP_PROXY_HEADERS": "Authorization: Bearer YOUR_API_KEY"
      }
    }
  }
}`}</code>
                </pre>
              </div>

              {/* HTTP Direct */}
              <div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>Direct HTTP (Any Client)</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--floyd-text-muted)' }}>
                  For custom integrations, use the JSON-RPC 2.0 endpoint directly:
                </p>
                <pre
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)' }}
                >
                  <code style={{ color: 'var(--floyd-accent-cyan)' }}>{`POST ${serverUrl}
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Start Using */}
        <section className="floyd-card p-6 mb-12">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--floyd-accent-green)20', border: '1px solid var(--floyd-accent-green)' }}
            >
              <span className="font-bold" style={{ color: 'var(--floyd-accent-green)' }}>3</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>
                <Zap className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-green)' }} />
                Start Using Tools
              </h2>
              <p className="mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                Once connected, your LLM can access all 73 skills through the proxy tool, or use the REST API:
              </p>
              <pre
                className="p-4 rounded-lg overflow-x-auto text-sm mb-4"
                style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)' }}
              >
                <code style={{ color: 'var(--floyd-accent-green)' }}>{`// MCP: Execute a skill through the floyd proxy
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "floyd",
    "arguments": {
      "action": "execute",
      "skill": "concept-crystallization",
      "args": { "action": "crystallize", "concept": "microservices" }
    }
  }
}

// REST: List all skills
GET /api/mcp/skills

// REST: Execute a skill directly
POST /api/mcp/skills/build-error-correlator/execute
Body: { "input": { ... } }

// REST: Browse server tools
GET /api/mcp/servers/floyd-core/tools`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="floyd-card p-6 mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
            <Code className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-cyan)' }} />
            API Reference
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
            Full interactive docs available at{' '}
            <Link href="/api-docs" className="font-mono" style={{ color: 'var(--floyd-accent-cyan)' }}>/api-docs</Link>
          </p>
          <div className="space-y-3">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--floyd-accent-pink)' }}>MCP Protocol (JSON-RPC)</h3>
            {[
              { method: 'initialize', desc: 'Initialize the MCP connection', auth: false },
              { method: 'tools/list', desc: 'List the floyd proxy tool', auth: true },
              { method: 'tools/call', desc: 'Execute a skill via the proxy', auth: true },
              { method: 'ping', desc: 'Health check', auth: false },
            ].map((endpoint, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--floyd-bg-tertiary)' }}>
                <div>
                  <code className="font-mono" style={{ color: 'var(--floyd-accent-cyan)' }}>{endpoint.method}</code>
                  <span className="ml-3 text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{endpoint.desc}</span>
                </div>
                {endpoint.auth && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--floyd-accent-pink)20', color: 'var(--floyd-accent-pink)' }}>
                    Auth
                  </span>
                )}
              </div>
            ))}

            <h3 className="font-semibold text-sm pt-3" style={{ color: 'var(--floyd-accent-green)' }}>REST API</h3>
            {[
              { method: 'POST /api/mcp/auth', desc: 'Authenticate (shared password → JWT)', auth: false },
              { method: 'GET /api/mcp/servers', desc: 'List MCP servers', auth: false },
              { method: 'GET /api/mcp/servers/{name}/tools', desc: 'List tools per server', auth: false },
              { method: 'GET /api/mcp/skills', desc: 'List all 73 skills', auth: false },
              { method: 'GET /api/mcp/skills/{name}', desc: 'Get skill details', auth: false },
              { method: 'POST /api/mcp/skills/{name}/execute', desc: 'Execute a skill', auth: true },
              { method: 'GET /api/mcp/health', desc: 'Health check', auth: false },
              { method: 'GET /api/mcp/metrics', desc: 'Usage metrics', auth: false },
            ].map((endpoint, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--floyd-bg-tertiary)' }}>
                <div>
                  <code className="font-mono text-xs" style={{ color: 'var(--floyd-accent-green)' }}>{endpoint.method}</code>
                  <span className="ml-3 text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{endpoint.desc}</span>
                </div>
                {endpoint.auth && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--floyd-accent-pink)20', color: 'var(--floyd-accent-pink)' }}>
                    Auth
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem */}
        <section className="glass-panel p-6 mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>The Floyd Labs Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="floyd-card p-4">
              <h3 className="font-bold mb-1" style={{ color: 'var(--floyd-accent-cyan)' }}>FloydLabs.com</h3>
              <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                This site. MCP server, API docs, blog, skill browser, admin dashboard.
              </p>
            </div>
            <a href="https://www.LegacyAI.space" target="_blank" rel="noopener noreferrer" className="floyd-card p-4 block hover:border-[var(--floyd-accent-cyan)] transition-colors">
              <h3 className="font-bold mb-1 flex items-center gap-1" style={{ color: 'var(--floyd-accent-pink)' }}>
                LegacyAI.space <ExternalLink className="w-3 h-3" />
              </h3>
              <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                The Legacy AI parent project. Research, vision, and broader AI ecosystem.
              </p>
            </a>
            <a href="https://github.com/LegacyAI-FloydsLabs" target="_blank" rel="noopener noreferrer" className="floyd-card p-4 block hover:border-[var(--floyd-accent-cyan)] transition-colors">
              <h3 className="font-bold mb-1 flex items-center gap-1" style={{ color: 'var(--floyd-accent-green)' }}>
                GitHub <ExternalLink className="w-3 h-3" />
              </h3>
              <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                Open source. The Floyd Labs website, MCP system, and tools — all public.
              </p>
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel text-center p-8">
          <p className="mb-4 text-lg" style={{ color: 'var(--floyd-text-body)' }}>
            Ready to connect your AI to Floyd Labs?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold"
              style={{ background: 'var(--floyd-accent-cyan)', color: '#0a0510' }}
            >
              Request API Access
            </Link>
            <Link
              href="/api-docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ background: 'var(--floyd-bg-card)', border: '2px solid var(--floyd-glow-purple)', color: 'var(--floyd-text-body)' }}
            >
              Interactive API Docs
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ background: 'var(--floyd-bg-card)', border: '2px solid var(--floyd-accent-green)', color: 'var(--floyd-accent-green)' }}
            >
              Browse All Skills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
