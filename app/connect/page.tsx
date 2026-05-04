import { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Zap, Code, Copy, Server, Key, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Connect to MCP Server | Floyd Labs',
  description: 'Connect your LLM to Floyd Labs MCP server. 73+ AI tools accessible via the Model Context Protocol.',
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
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--floyd-text-muted)' }}>
            Access 73+ production-ready AI skills through a single proxy tool. 
            Context-efficient: only 1 tool schema loads instead of 73.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'AI Skills', value: '73+' },
            { label: 'Protocol', value: 'MCP 2024-11' },
            { label: 'Latency', value: '< 500ms' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat, i) => (
            <div key={i} className="floyd-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

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
                Request access to get your unique Floyd Labs API key.
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
                Once connected, your LLM can access all Floyd Labs skills. Example:
              </p>
              <pre
                className="p-4 rounded-lg overflow-x-auto text-sm mb-4"
                style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)' }}
              >
                <code style={{ color: 'var(--floyd-accent-green)' }}>{`// Execute a skill through the floyd proxy
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "floyd",
    "arguments": {
      "action": "execute",
      "skill": "concept-crystallization",
      "args": {
        "action": "crystallize",
        "concept": "microservices architecture"
      }
    }
  }
}

// List all available skills
{ "action": "list" }

// Get schema for a specific skill
{ "action": "describe", "skill": "git-bisect" }`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Available Tools Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--floyd-text-heading)' }}>
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Analogy Synthesis', desc: 'Generate meaningful analogies to explain complex concepts', category: 'reasoning' },
              { name: 'Code Review', desc: 'Systematic code review with quality analysis', category: 'workflows' },
              { name: 'API Validation', desc: 'Validate API contracts for compatibility', category: 'patterns' },
              { name: 'Risk Assessment', desc: 'Analyze and quantify project risks', category: 'analysis' },
              { name: 'Architecture Docs', desc: 'Generate system architecture documentation', category: 'documentation' },
              { name: '100+ More...', desc: 'Explore all available skills', category: 'all', link: '/tools' },
            ].map((tool, i) => (
              <div key={i} className="floyd-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: 'var(--floyd-text-heading)' }}>{tool.name}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: 'var(--floyd-accent-cyan)20', color: 'var(--floyd-accent-cyan)' }}
                  >
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{tool.desc}</p>
                {tool.link && (
                  <Link href={tool.link} className="inline-flex items-center gap-1 mt-2 text-sm" style={{ color: 'var(--floyd-accent-cyan)' }}>
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section className="floyd-card p-6 mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
            <Code className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-cyan)' }} />
            API Reference
          </h2>
          <div className="space-y-4">
            {[
              { method: 'initialize', desc: 'Initialize the MCP connection', auth: false },
              { method: 'tools/list', desc: 'List all available tools', auth: true },
              { method: 'tools/call', desc: 'Execute a tool with arguments', auth: true },
              { method: 'ping', desc: 'Health check endpoint', auth: false },
            ].map((endpoint, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--floyd-bg-tertiary)' }}>
                <div>
                  <code className="font-mono" style={{ color: 'var(--floyd-accent-cyan)' }}>{endpoint.method}</code>
                  <span className="ml-3 text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{endpoint.desc}</span>
                </div>
                {endpoint.auth && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--floyd-accent-pink)20', color: 'var(--floyd-accent-pink)' }}>
                    Auth Required
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel text-center p-8">
          <p className="mb-4 text-lg" style={{ color: 'var(--floyd-text-body)' }}>
            Ready to connect your AI to the Floyd Labs MCP server?
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
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ background: 'var(--floyd-bg-card)', border: '2px solid var(--floyd-glow-purple)', color: 'var(--floyd-text-body)' }}
            >
              Browse All Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
