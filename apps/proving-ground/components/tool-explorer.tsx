"use client";

import { useMemo, useState } from "react";
import { tools } from "@/lib/site-data";

const groups = ["all", "floyd-core", "ai-cognition", "ai-orchestration", "ghost-algorithm"] as const;

export function ToolExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof groups)[number]>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tools.filter(([name, category, description]) => {
      const matchesGroup = group === "all" || category === group;
      const matchesQuery = !needle || `${name} ${category} ${description}`.toLowerCase().includes(needle);
      return matchesGroup && matchesQuery;
    });
  }, [query, group]);

  return (
    <div>
      <div className="tool-controls glass-panel">
        <label>
          <span className="sr-only">Search skills</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills, servers, or capabilities…"
          />
        </label>
        <div className="filter-row" aria-label="Filter by server">
          {groups.map((item) => (
            <button
              key={item}
              type="button"
              className={group === item ? "filter active" : "filter"}
              aria-pressed={group === item}
              onClick={() => setGroup(item)}
            >
              {item === "all" ? "All" : item}
            </button>
          ))}
        </div>
        <span className="result-count">{filtered.length} preview skills shown · 73 in the complete catalog</span>
      </div>
      <div className="card-grid three-col">
        {filtered.map(([name, category, description]) => (
          <article className="floyd-card tool-card" key={name}>
            <span className={`tag ${category}`}>{category}</span>
            <h2>{name.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}</h2>
            <p>{description}</p>
            <div className="tool-meta"><span>v2.0.0</span><span>$0/month</span></div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="glass-panel empty-state">No matching skills. Floyd checked twice and blamed the query.</div>
      )}
    </div>
  );
}
