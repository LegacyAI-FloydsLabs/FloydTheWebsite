import { PageHero } from "@/components/page-hero";
import { ToolExplorer } from "@/components/tool-explorer";
import { toolGroups } from "@/lib/site-data";

export const metadata = {
  title: "MCP Tools & Skills",
  description: "Explore the Floyd Labs tool catalog and Model Context Protocol servers.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero eyebrow="MODEL CONTEXT PROTOCOL" title="MCP Tools & Skills">
        <p>73 AI skills across three MCP servers, plus 10 Ghost Algorithms. Search this representative catalog to test layouts and interactions.</p>
      </PageHero>
      <section className="section-pad compact">
        <div className="content-wrap">
          <div className="card-grid three-col server-grid">
            {toolGroups.map((group) => (
              <div className="floyd-card" key={group.name}>
                <span className={`status-dot ${group.accent}`} />
                <h2 className={group.accent}>{group.name}</h2>
                <strong>{group.count} mapped tools</strong>
                <p>{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad compact">
        <div className="content-wrap"><ToolExplorer /></div>
      </section>
    </>
  );
}
