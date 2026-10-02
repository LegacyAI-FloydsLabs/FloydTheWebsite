import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { toolGroups } from "@/lib/site-data";

export const metadata = {
  title: "Connect to MCP",
  description: "Connect an LLM to the Floyd Labs MCP server and REST API.",
};

const configExample = `{
  "mcpServers": {
    "floyd-labs": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-proxy"],
      "env": {
        "MCP_PROXY_URL": "https://floydslabs.com/api/mcp",
        "MCP_PROXY_HEADERS": "Authorization: Bearer YOUR_API_KEY"
      }
    }
  }
}`;

const requestExample = `POST https://floydslabs.com/api/mcp
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}`;

export default function ConnectPage() {
  return (
    <>
      <PageHero eyebrow="● MCP SERVER LIVE" title="Connect Your LLM to Floyd Labs">
        <p>73 production-ready AI skills organized across three MCP servers. Use JSON-RPC, the REST API, or interactive documentation.</p>
        <div className="button-row">
          <a className="button secondary" href="https://github.com/LegacyAI-FloydsLabs" target="_blank" rel="noreferrer">GitHub Organization ↗</a>
          <a className="button primary" href="https://www.LegacyAI.space" target="_blank" rel="noreferrer">LegacyAI.space ↗</a>
        </div>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap">
          <h2 className="center-heading">3 MCP Servers · 67 Mapped Tools · 73 Total Skills</h2>
          <div className="card-grid three-col server-grid">
            {toolGroups.map((server) => (
              <article className="floyd-card" key={server.name}>
                <span className={`status-dot ${server.accent}`} />
                <h3 className={server.accent}>{server.name}</h3>
                <strong>{server.count} tools</strong>
                <p>{server.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad compact">
        <div className="content-wrap narrow steps">
          <article className="floyd-card step-card">
            <span className="step-number cyan">1</span>
            <div>
              <h2>Get Your API Key</h2>
              <p>Request access to get a unique Floyd Labs key with rate limiting and usage tracking.</p>
              <Link href="/contact" className="button primary small">Request API Access →</Link>
            </div>
          </article>
          <article className="floyd-card step-card">
            <span className="step-number pink">2</span>
            <div>
              <h2>Configure Your MCP Client</h2>
              <p>Add Floyd Labs to your client configuration.</p>
              <pre><code>{configExample}</code></pre>
            </div>
          </article>
          <article className="floyd-card step-card">
            <span className="step-number green">3</span>
            <div>
              <h2>Start Using Tools</h2>
              <p>Use the single-tool proxy or call the JSON-RPC endpoint directly.</p>
              <pre><code>{requestExample}</code></pre>
              <Link href="/api-docs" className="text-link">Browse the API surface →</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
