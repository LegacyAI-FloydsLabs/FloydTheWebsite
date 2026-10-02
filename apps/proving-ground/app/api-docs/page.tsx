import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "API Docs",
  description: "Preview documentation for the Floyd Labs MCP and REST API.",
};

const endpoints = [
  ["POST", "/api/mcp/auth", "Exchange the shared secret for a short-lived token."],
  ["GET", "/api/mcp/servers", "List the three Floyd Labs MCP servers."],
  ["GET", "/api/mcp/servers/{name}/tools", "List mapped tools for a server."],
  ["GET", "/api/mcp/skills", "List all available skills."],
  ["POST", "/api/mcp/skills/{name}/execute", "Execute a skill with JSON input."],
  ["GET", "/api/mcp/health", "Check system health without authentication."],
  ["GET", "/api/mcp/metrics", "Review authenticated usage statistics."],
] as const;

export default function ApiDocsPage() {
  return (
    <>
      <PageHero eyebrow="OPENAPI 3.0 · PREVIEW" title="Floyd MCP System API">
        <p>Three MCP servers, 67 mapped tools, and a REST interface for development operations, AI cognition, and multi-agent orchestration.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap docs-layout">
          <aside className="glass-panel docs-sidebar">
            <strong>Endpoints</strong>
            <a href="#authentication">Authentication</a>
            <a href="#servers">Servers</a>
            <a href="#skills">Skills</a>
            <a href="#health">Health & Metrics</a>
          </aside>
          <div className="docs-main">
            <div className="glass-panel docs-intro" id="authentication">
              <h2>Authentication</h2>
              <p>Protected endpoints accept a bearer token. This proving ground documents the shape of the API but does not connect to production services.</p>
              <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
            </div>
            <div className="endpoint-list">
              {endpoints.map(([method, path, description], index) => (
                <article className="floyd-card endpoint" key={path} id={index === 1 ? "servers" : index === 3 ? "skills" : index === 5 ? "health" : undefined}>
                  <div><span className={`method ${method.toLowerCase()}`}>{method}</span><code>{path}</code></div>
                  <p>{description}</p>
                  <details>
                    <summary>Example response</summary>
                    <pre><code>{`{
  "ok": true,
  "source": "floyd-labs-proving-ground",
  "note": "Preview documentation only"
}`}</code></pre>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
