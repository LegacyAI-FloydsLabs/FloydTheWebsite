# FloydTheWebsite — FLOYD.md
**Version:** 1.0.0
**Initialized:** 2025-05-05
**Governance:** .supercache/ v1.7.0
**Port:** 17000 (claimed in port-registry.json)
**Drive:** SanDisk1Tb
**Path:** /Volumes/SanDisk1Tb/FloydsLabs.com/floyd-labs-complete-handoff

> **Compliance Notice:** This file must match the template at
> `.supercache/templates/floyd-md-template.md`. If you are an agent reading
> this file and it is missing sections from the template, edit this file to
> add them. Preserve all project-specific content below. The template is the
> spec. This file is the implementation. Make them match.

---

## Agent Contract

You are working on **FloydTheWebsite**, a Legacy AI project.

**This file (`FLOYD.md`) is the canonical project spec.** It is authoritative for project identity, stack, ports, build commands, environment variables, and project-specific rules. All agents — Floyd, Claude, or any model routed through the OhMyFloyd harness — read this file first.

**Some projects also have a `CLAUDE.md` adapter** alongside this file. That adapter is optional and applies only when Claude is the active agent. It does not duplicate anything here; it layers Claude-specific behavior and role guidance on top. If `CLAUDE.md` conflicts with `FLOYD.md` on project facts, `FLOYD.md` wins. See `.supercache/templates/claude-md-template.md` for the adapter spec.

### Before You Start
1. Read this file completely. Do not skim. Every section constrains your behavior.
2. **If you are Claude Code**: also read `CLAUDE.md` if it exists at the project root. It contains your role, division of labor with Floyd, and Claude-specific rules.
3. Read `.supercache/READONLY` — you MUST NOT write to `.supercache/`.
4. Read `SSOT/FloydTheWebsite_SSOT.md` for current project state. Perform the Verification Sweep Protocol defined in `.supercache/contracts/document-management.md` for sections relevant to your task.
5. Read `Issues/FloydTheWebsite_ISSUES.md` for open issues and blockers.
6. Read `.supercache/manifests/port-allocation-policy.yaml` — NEVER use port 3000, 5000, 8000, 8080, or any other forbidden port. This project uses port **17000**. Do not change it without Douglas Talley's explicit approval.
7. Read `.supercache/contracts/execution-contract.md` — this governs how you prove your work.
8. Read `.supercache/contracts/repo-structure.md` — canonical layout for this project's language, plus the migration workflow if structural changes are needed.
9. Read `.supercache/contracts/git-discipline.md` — pre-commit checklist, commit message standards, secret hygiene, and reputation guardrails.
10. Read `.supercache/contracts/document-management.md` — Anti-Cruft Rule, canonical document homes, SSOT verification sweep, reference materials tier.
11. Read `.supercache/contracts/repo-hygiene.md` — `.gitignore` baseline for this language, cleanup triggers, project root tidiness standards.
12. Read `.supercache/manifests/model-routing.yaml` — this tells you which LLM to use for what.

### Governance Location
```
.supercache/ -> /Volumes/SanDisk1Tb/.supercache
```
This directory contains global templates, contracts, manifests, and routing config.
It is **READ-ONLY**. Do not create, modify, or delete any file there.

### Where You Write

| Location             | Purpose                                          | Example                                         |
|----------------------|--------------------------------------------------|-------------------------------------------------|
| `SSOT/`              | Project status, decisions, findings, verification | `SSOT/FloydTheWebsite_SSOT.md`, `SSOT/decision-log.md` |
| `Issues/`            | Bugs, blockers, tasks, help-desk ledger          | `Issues/FloydTheWebsite_ISSUES.md`, `Issues/0001-description.md` |
| `.floyd/`            | Agent working state, session logs, runtime cache | `.floyd/agent_log.jsonl`                        |
| Project source files | Your actual work                                 | Any file in the project tree not listed below   |

### Where You Do NOT Write

| Location          | Reason                                       |
|-------------------|----------------------------------------------|
| `.supercache/`    | Global governance — READ-ONLY for all agents |

---

## Project Identity

| Field                | Value                                                                   |
|----------------------|-------------------------------------------------------------------------|
| **Name**             | FloydTheWebsite                                                        |
| **Purpose**          | Official Floyd Labs website at floydslabs.com - showcasing AI tools, MCP servers, and ecosystem |
| **Primary Language** | TypeScript (ES2020, strict)                                         |
| **Runtime**          | Node.js >= 18.0.0                                                     |
| **Module System**    | ESM                                                                   |
| **Framework**        | Next.js 14.2.28 (App Router)                                          |
| **Database**         | PostgreSQL 17 (Neon) via Prisma 6.7.0 ORM                            |
| **Port**             | **17000** — claimed in `/Volumes/SanDisk1Tb/SSOT/port-registry.json`     |
| **Repository**       | github.com/LegacyAI-FloydsLabs/FloydTheWebsite                       |
| **Current Phase**    | Production                                                           |

---

## Project Structure

```
FloydTheWebsite/
├── app/                          # Next.js App Router pages
│   ├── _components/              # Homepage-specific components
│   │   ├── hero-section.tsx      # Animated hero with framer-motion
│   │   └── stats-section.tsx     # Animated counters (73 tools, 13 servers, etc.)
│   ├── about/page.tsx            # About page — team, philosophy, ecosystem
│   ├── admin/                    # Protected admin panel
│   │   ├── api-keys/page.tsx     # API key management for MCP clients
│   │   ├── apps/                 # Application CRUD (Floyd Suite apps)
│   │   │   ├── page.tsx         # List all applications
│   │   │   ├── new/page.tsx     # Create new application
│   │   │   └── [id]/page.tsx     # Edit application
│   │   ├── blog/                 # Blog post CRUD
│   │   │   ├── page.tsx         # List all blog posts
│   │   │   ├── new/page.tsx     # Create new blog post
│   │   │   └── [id]/page.tsx     # Edit blog post
│   │   ├── contacts/page.tsx     # Contact submissions viewer
│   │   ├── login/page.tsx        # Admin login form
│   │   └── page.tsx             # Admin dashboard
│   ├── api/                      # API endpoints
│   │   ├── auth/                 # Authentication
│   │   │   └── [...nextauth]/route.ts  # NextAuth handler
│   │   ├── contact/route.ts      # Contact form submission
│   │   ├── signup/route.ts       # User signup
│   │   ├── admin/               # Admin API routes
│   │   │   ├── api-keys/         # API key management
│   │   │   ├── blog/            # Blog management
│   │   │   ├── apps/            # Application management
│   │   │   └── contacts/        # Contact management
│   │   └── mcp/                 # MCP server management
│   │       ├── auth/route.ts    # MCP authentication
│   │       ├── health/route.ts  # MCP health checks
│   │       ├── metrics/route.ts # MCP usage metrics
│   │       ├── api-docs-json/route.ts # MCP API docs
│   │       ├── route.ts         # MCP root handler
│   │       ├── servers/route.ts # MCP server registry
│   │       └── skills/          # MCP skill management
│   │           ├── [name]/route.ts # Specific skill
│   │           └── [name]/execute/route.ts # Skill execution
│   ├── api-docs/page.tsx        # API documentation page
│   ├── blog/                    # Public blog
│   │   ├── page.tsx             # Blog post listing
│   │   └── [slug]/page.tsx      # Individual blog post
│   ├── connect/page.tsx         # Connect page (MCP, Claude, etc.)
│   ├── contact/page.tsx         # Contact form
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles (Tailwind + custom)
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # SEO robots config
│   └── sitemap.ts              # SEO sitemap
├── components/                 # Reusable UI components
│   ├── ui/                     # ShadCN/ui components (50+)
│   │   ├── button.tsx, card.tsx, dialog.tsx, form.tsx, input.tsx
│   │   ├── table.tsx, select.tsx, checkbox.tsx, radio-group.tsx
│   │   ├── tabs.tsx, toast.tsx, tooltip.tsx, badge.tsx, avatar.tsx
│   │   ├── popup.tsx, hover-card.tsx, navigation-menu.tsx
│   │   └── ... (50+ components)
│   ├── footer.tsx              # Site footer
│   ├── navbar.tsx              # Site navigation bar
│   ├── providers.tsx           # Context providers wrapper
│   ├── theme-provider.tsx      # Next-themes provider
│   └── theme-toggle.tsx        # Dark/light mode toggle
├── lib/                        # Utilities and business logic
│   ├── mcp/                    # MCP server integration
│   │   ├── auth.ts             # MCP authentication utilities
│   │   ├── executor.ts         # MCP tool execution
│   │   ├── servers.ts          # MCP server registry
│   │   ├── skills.ts           # Skill management
│   │   └── types.ts            # Type definitions
│   ├── auth.ts                 # NextAuth configuration
│   ├── blog-data.ts            # Blog post content (static data)
│   ├── db.ts                   # Prisma client singleton
│   └── utils.ts                # Utility functions
├── prisma/                     # Database
│   ├── schema.prisma           # Prisma schema (11 models)
│   └── .backup_schema.prisma   # Backup schema
├── public/                     # Static assets
│   ├── bg-graffiti.png         # Background image
│   ├── FloydsLabs.png          # Logo
│   └── og-image.png            # OpenGraph image
├── scripts/                    # Database scripts
│   ├── seed.ts                 # Main seeding script
│   ├── safe-seed.ts            # Safe seeding wrapper
│   └── populate-skills.ts      # Skill population
├── hooks/                      # React hooks
│   └── use-toast.ts            # Toast notification hook
├── types/                      # TypeScript declarations
│   └── next-auth.d.ts          # NextAuth type extensions
├── SSOT/                       # Project SSOT and decisions
│   ├── FloydTheWebsite_SSOT.md # This project's SSOT
│   └── floyd-website-verification-ssot.md # Verification report
├── Issues/                     # Bug and task tracking
│   └── FloydTheWebsite_ISSUES.md # Project issues ledger
├── .floyd/                     # Agent working state
│   ├── agent-session-2025-05-05.md # Session log
│   └── inspection-verification-report.md # Verification report
├── .env.example                # Environment variable template
├── components.json             # ShadCN/ui configuration
├── next-env.d.ts               # Next.js type declarations
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Build & Verify Commands

| Action         | Command                                                        | Expected Result             |
|----------------|----------------------------------------------------------------|-----------------------------|
| **Type check** | `npx tsc --noEmit`                                             | Exit 0, no errors           |
| **Build**      | `prisma generate && next build`                                | Exit 0                      |
| **Test**       | `N/A — No test suite currently configured`                    | N/A — No tests              |
| **Lint**       | `next lint`                                                    | Exit 0                      |
| **Start**      | `PORT=17000 next start`                                       | Service up on port 17000   |
| **Dev**        | `PORT=17000 next dev`                                         | Live reload active on port 17000 |

### Verification sequence after any change:
```bash
npx tsc --noEmit && next lint && prisma generate && next build
```

---

## Port Allocation

| Port         | Service                                   | Status                              |
|--------------|-------------------------------------------|-------------------------------------|
| **17000**    | HTTP server (Next.js development)         | **CLAIMED** in `port-registry.json` |

**Rules:**
- This project runs on port **17000**. That port is claimed in `/Volumes/SanDisk1Tb/SSOT/port-registry.json`.
- Do not change the port without Douglas Talley's explicit approval.
- Do not bind to any port in the forbidden list (see `.supercache/manifests/port-allocation-policy.yaml`).
- Verify before starting: `lsof -i :17000` — if something else is bound, investigate before killing.

---

## Project-Specific Rules

| #   | Rule | Rationale |
|-----|------|-----------|
| R1  | Never write to .supercache/ — it is READ-ONLY governance | Corruption affects all Legacy AI projects |
| R2  | All database writes must go through Prisma ORM, never raw SQL | Schema enforcement and migration safety |
| R3  | MCP API keys must be stored encrypted in the database | Security requirement for MCP server access |
| R4  | Always verify environment variables before deployment | Missing vars cause runtime failures |
| R5  | Blog content changes must update both blog-data.ts and database | Static site generation relies on both |

---

## Known Patterns & Lessons

| Pattern | Trigger | Fix | Confidence |
|---------|---------|-----|------------|
| neon-pooler-ssl | Database connection errors | Use `?sslmode=require` in DATABASE_URL | 1.0 |
| vercel-env-auto | NEXTAUTH_URL not set in production | Vercel auto-injects this - do not hardcode | 1.0 |
| shadcn-import | Missing UI component imports | Run `npx shadcn-ui@latest add <component>` | 1.0 |
| prisma-sync | Schema changes not reflected | Run `prisma generate && prisma migrate dev` | 1.0 |

---

## Environment Variables

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `DATABASE_URL` | Yes | Neon Postgres pooled connection string | `postgresql://user:password@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret for NextAuth | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Site URL for NextAuth | `https://floydslabs.com` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL | `https://floydslabs.com` |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret | Google Cloud Console |

---

## Execution Contract

Before claiming any task complete, provide:

1. **Exact action taken** — what you did, specifically
2. **Direct evidence** — file path + line, command + output, diff, or screenshot
3. **Verification result** — run the verification sequence above, all must exit 0
4. **Status** — mark COMPLETE only after steps 1-3 are proven

See `.supercache/contracts/execution-contract.md` for the full contract.

---

## Mandatory execution contract
For EACH requested item:
1) Show exact action taken
2) Show direct evidence (file/line/command/output)
3) Show verification result
4) Mark status only after proof

## Forbidden behaviors
- Declaring "done" without evidence
- Collapsing multiple requested items into one vague summary
- Skipping failed steps without explicit blocker report

## Required output structure
A) Requested items checklist
B) Per-item evidence ledger
C) Verification receipts
D) Completeness matrix (item -> done/blocked -> evidence)

## Hard gate
If any requested item has no evidence row, final status MUST be INCOMPLETE.
