import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { toolGroups } from "@/lib/site-data";

export const metadata = {
  title: "Connect to MCP",
  description: "Connect an LLM to the Floyd Labs MCP server and REST API.",
};

const initializeExample = `curl https://www.floydslabs.com/api/mcp \\
  --header 'Content-Type: application/json' \\
  --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": { "name": "my-client", "version": "1.0" }
    }
  }'`;

const requestExample = `curl https://www.floydslabs.com/api/mcp \\
  --header 'Content-Type: application/json' \\
  --header "Authorization: Bearer $FLOYD_API_KEY" \\
  --data '{ "jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {} }'`;

export default function ConnectPage() {
  return (
    <>
      <PageHero eyebrow="● MCP SERVER LIVE" title="Connect Your LLM to Floyd Labs">
        <p>A catalog of 73 AI skills across three tool groups. Connect through the production JSON-RPC endpoint or explore the REST API reference.</p>
        <div className="button-row">
          <a className="button secondary" href="https://github.com/LegacyAI-FloydsLabs" target="_blank" rel="noreferrer">GitHub Organization ↗</a>
          <a className="button primary" href="https://www.LegacyAI.space" target="_blank" rel="noreferrer">LegacyAI.space ↗</a>
        </div>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap">
          <h2 className="center-heading">3 Tool Groups · 67 Mapped Tools · 73 Catalog Skills</h2>
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
              <a href="https://www.floydslabs.com/contact" className="button primary small">Request API Access →</a>
            </div>
          </article>
          <article className="floyd-card step-card">
            <span className="step-number pink">2</span>
            <div>
              <h2>Check the Connection</h2>
              <p>The production endpoint accepts JSON-RPC POST requests and reports protocol version 2024-11-05. This handshake does not require an API key.</p>
              <pre><code>{initializeExample}</code></pre>
              <p>Client support depends on its transport. Clients that require stdio or SSE need a compatible adapter; this endpoint is not an SSE URL.</p>
            </div>
          </article>
          <article className="floyd-card step-card">
            <span className="step-number green">3</span>
            <div>
              <h2>List Available Tools</h2>
              <p>Set your issued key in the FLOYD_API_KEY environment variable, then request the tool list. The endpoint exposes a single <code>floyd</code> proxy with list, describe, and execute actions. Tool access requires a valid API key.</p>
              <pre><code>{requestExample}</code></pre>
              <Link href="/api-docs" className="text-link">Browse the API surface →</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
