# Floyd Labs Website — Complete Handoff Documentation

**Project:** FloydTheWebsite  
**Owner:** Douglas Talley (Floyd Labs / Legacy AI)  
**Domain:** [floydslabs.com](https://floydslabs.com)  
**GitHub:** [LegacyAI-FloydsLabs/FloydTheWebsite](https://github.com/LegacyAI-FloydsLabs/FloydTheWebsite)  
**Last Updated:** May 5, 2026  
**Commit:** `c0d8ac1`  

---

## 1. Architecture Overview

### Stack
| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | Pages use Server Components by default, Client Components where interactivity needed |
| Language | TypeScript (strict) | `tsconfig.json` with path aliases (`@/` → project root) |
| Database | PostgreSQL 17 (Neon) | Prisma ORM, pooled connection via Neon |
| Auth | NextAuth.js v4 | Credentials (email/password) + Google SSO, JWT strategy |
| Styling | Tailwind CSS 3 + custom CSS vars | Cyberpunk/neon theme, glassmorphism panels |
| UI Components | Radix UI + ShadCN primitives | 35+ components in `components/ui/` |
| Animations | Framer Motion 10 | Hero section, stats counters, page transitions |
| Hosting | Vercel (primary) | Auto-deploy on push to `main` branch |
| DB Hosting | Neon Postgres | Pooled endpoint, `?sslmode=require` |
| DNS/Domain | floydslabs.com | Configured via Vercel |

### Companion Sites
| Site | URL | Purpose |
|------|-----|--------|
| Legacy AI | [www.LegacyAI.space](https://www.LegacyAI.space) | Parent brand / ecosystem hub |
| GitHub Org | [github.com/LegacyAI-FloydsLabs](https://github.com/LegacyAI-FloydsLabs) | Open source repos |

---

## 2. Directory Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── _components/              # Homepage-specific components
│   │   ├── hero-section.tsx      # Animated hero with framer-motion
│   │   └── stats-section.tsx     # Animated counters (73 tools, 3 servers, etc.)
│   ├── about/page.tsx            # About page — team, philosophy, ecosystem
│   ├── admin/                    # Protected admin panel
│   │   ├── api-keys/page.tsx     # API key management
│   │   ├── apps/                 # Application CRUD
│   │   ├── blog/                 # Blog post CRUD
│   │   ├── contacts/page.tsx     # Contact submissions viewer
│   │   ├── login/page.tsx        # Admin login form
│   │   ├── tools/page.tsx        # Skills management
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   └── page.tsx              # Admin dashboard
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin CRUD endpoints
│   │   ├── auth/[...nextauth]/   # NextAuth catch-all
│   │   ├── contact/route.ts      # Contact form submission
│   │   ├── mcp/                  # MCP Server API (see §5)
│   │   └── signup/route.ts       # User registration
│   ├── api-docs/page.tsx         # Swagger UI for MCP API
│   ├── apps/page.tsx             # Floyd Suite showcase
│   ├── blog/                     # Blog listing + detail
│   │   ├── page.tsx              # Blog index (DB + static fallback)
│   │   └── [slug]/page.tsx       # Individual post (markdown rendered)
│   ├── connect/page.tsx          # MCP connection guide
│   ├── contact/                  # Contact page + form component
│   ├── globals.css               # Theme: CSS vars, glass-panel, floyd-card
│   ├── layout.tsx                # Root layout (meta, fonts, providers)
│   ├── not-found.tsx             # Custom 404
│   ├── page.tsx                  # Homepage
│   ├── privacy/page.tsx          # Privacy policy
│   ├── robots.ts                 # Dynamic robots.txt
│   ├── sitemap.ts                # Dynamic sitemap.xml
│   └── terms/page.tsx            # Terms of service
├── components/                   # Shared components
│   ├── footer.tsx                # Global footer (ecosystem links)
│   ├── navbar.tsx                # Global nav (7 links + mobile menu)
│   ├── providers.tsx             # SessionProvider + ThemeProvider wrapper
│   ├── theme-provider.tsx        # next-themes provider
│   ├── theme-toggle.tsx          # Dark/light toggle
│   └── ui/                       # 35+ ShadCN/Radix components
├── hooks/
│   └── use-toast.ts              # Toast notification hook
├── lib/
│   ├── auth.ts                   # NextAuth config (Credentials + Google)
│   ├── blog-data.ts              # Static blog post data (fallback)
│   ├── db.ts                     # Prisma client singleton
│   ├── mcp/                      # MCP server library
│   │   ├── auth.ts               # JWT token generation/validation
│   │   ├── executor.ts           # Skill execution engine
│   │   ├── servers.ts            # 3 server definitions + tool mapping
│   │   ├── skills.ts             # Skill fetching from DB
│   │   └── types.ts              # TypeScript interfaces
│   ├── types.ts                  # App-wide types
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
├── prisma/
│   └── schema.prisma             # Database schema (11 models)
├── public/
│   ├── FloydsLabs.png            # Logo
│   ├── bg-graffiti.png           # Background texture
│   └── og-image.png              # Open Graph social share image
├── scripts/
│   ├── populate-skills.ts        # Bulk skill import
│   ├── safe-seed.ts              # Non-destructive seed
│   └── seed.ts                   # Initial data seed
├── types/
│   └── next-auth.d.ts            # NextAuth type augmentations
├── .env.example                  # Environment variable template
├── .gitignore
├── components.json               # ShadCN component config
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS (Tailwind)
├── tailwind.config.ts            # Tailwind theme extensions
├── tsconfig.json                 # TypeScript config
├── vercel.json                   # Vercel build config
└── yarn.lock                     # Dependency lockfile
```

---

## 3. Database Schema

### Models (11 total)

| Model | Table | Purpose | Key Fields |
|-------|-------|---------|------------|
| `session` | `sessions` | MCP session tracking | `session_id`, `expires_at`, `metadata` |
| `usage_tracking` | `usage_tracking` | Tool execution metrics | `tool_name`, `server`, `execution_time`, `success` |
| `skills_cache` | `skills_cache` | **73 AI skills** — the core data | `skill_name` (PK), `content` (markdown), `schema` (JSON) |
| `contact_submission` | `contact_submissions` | Contact form entries | `name`, `email`, `message`, `status` |
| `User` | `users` | Admin/auth users | `email`, `password` (bcrypt), `role`, OAuth fields |
| `Account` | `accounts` | OAuth account links | `provider`, `providerAccountId`, `access_token` |
| `VerificationToken` | `verification_tokens` | Email verification | `identifier`, `token`, `expires` |
| `blog_post` | `blog_posts` | Blog content | `slug`, `title`, `content` (markdown), `published` |
| `application` | `applications` | Floyd Suite apps | `name`, `slug`, `status`, `features[]` |
| `api_key` | `api_keys` | MCP API authentication | `key` (unique), `tier`, `rate_limit`, `calls_today` |
| `mcp_call_log` | `mcp_call_logs` | MCP execution audit trail | `api_key_id`, `skill_name`, `duration_ms`, `success` |

### Row Counts (as of May 5, 2026)
| Table | Rows |
|-------|------|
| `skills_cache` | 73 |
| `blog_posts` | 5 |
| `users` | 4 |
| `applications` | 4 |
| `contact_submissions` | 3 |
| `accounts` | 1 |
| Others | 0 (empty, ready for use) |

### Connection String Format
```
postgresql://<user>:<password>@<host>/<database>?sslmode=require
```
- Uses Neon's **pooled** endpoint (port 5432 via `-pooler` hostname)
- `?sslmode=require` is mandatory
- Do NOT add `?channel_binding=disable` — Neon pooler doesn't need it

---

## 4. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon Postgres pooled connection string |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | ✅ (prod) | `https://floydslabs.com` — Vercel sets this automatically |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://floydslabs.com` — used in sitemap/robots |
| `GOOGLE_CLIENT_ID` | For Google SSO | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | For Google SSO | Google OAuth 2.0 client secret |
| `ABACUSAI_API_KEY` | Optional | Legacy — was used for Abacus LLM APIs |

### Vercel Environment Setup
All vars must be set in Vercel Dashboard → Project Settings → Environment Variables for **Production**, **Preview**, and **Development** environments.

---

## 5. MCP Server System

The MCP (Model Context Protocol) API is the technical backbone of Floyd Labs — it exposes 73 AI skills as callable tools for LLMs.

### Architecture
```
Client (LLM/Agent)
    │
    ▼
/api/mcp/auth  →  JWT Token
    │
    ▼
/api/mcp/servers  →  3 servers listed
/api/mcp/servers/{name}/tools  →  tools for that server
/api/mcp/skills  →  all 73 skills
/api/mcp/skills/{name}  →  skill detail + schema
/api/mcp/skills/{name}/execute  →  run a skill
/api/mcp/health  →  system health
/api/mcp/metrics  →  usage stats
/api/mcp/api-docs-json  →  OpenAPI 3.0 spec
```

### The 3 MCP Servers
| Server | Tools | Domain |
|--------|-------|--------|
| `floyd-core` | 19 mapped | Dev ops, code analysis, build tools, git |
| `ai-cognition` | 22 mapped | Pattern recognition, semantic analysis, knowledge synthesis |
| `ai-orchestration` | 26 mapped | Multi-agent coordination, task management, swarm intelligence |

**Total mapped tools:** 67 (explicitly assigned to servers)  
**Total skills in DB:** 73 (includes 6 unassigned + Ghost Algorithms)  
**Ghost Algorithms:** 10 (autonomous emergent behaviors, not server-bound)

### Authentication Flow
1. POST `/api/mcp/auth` with `{ password: "<shared_password>" }`
2. Receive JWT token (24h expiry)
3. Include `Authorization: Bearer <token>` on all subsequent requests

### Key Files
- `lib/mcp/servers.ts` — Server definitions + tool→server mapping (3 `Set<string>` collections)
- `lib/mcp/auth.ts` — JWT generation/validation using `jsonwebtoken`
- `lib/mcp/executor.ts` — Skill execution engine (fetches from DB, runs logic)
- `lib/mcp/skills.ts` — DB queries for skills
- `lib/mcp/types.ts` — TypeScript interfaces
- `app/api/mcp/api-docs-json/route.ts` — Full OpenAPI 3.0 spec generator

### Tool Name Convention
- **DB stores:** hyphenated (`build-error-correlator`)
- **Server mapping uses:** underscored (`build_error_correlator`)
- `getServerForSkill()` in `servers.ts` normalizes by replacing `-` with `_`
- 6 tools in the server mapping don't have exact DB matches (cosmetic gap, not functional)

---

## 6. Authentication System

### Providers
1. **Credentials** — email + bcrypt-hashed password
2. **Google SSO** — OAuth 2.0 via `next-auth/providers/google`
   - `allowDangerousEmailAccountLinking: true` — links Google to existing email accounts

### Session Strategy
- JWT-based (not database sessions)
- Token includes: `id`, `role`, `email`, `name`
- Session callback exposes these to client via `useSession()`

### Protected Routes
- `/admin/*` — requires authenticated session with admin role
- `/api/admin/*` — API routes check `getServerSession(authOptions)`
- `/api/mcp/*` — uses separate JWT auth (MCP shared password, not NextAuth)

### Admin Users
Admin panel accessible at `/admin/login`. Users in `users` table with `role: "admin"`.

---

## 7. Theming & Design System

### Visual Identity
- **Theme:** Neon cyberpunk with glassmorphism
- **Colors:** Cyan (#00e5ff) primary accent, Magenta/Purple (#9c27b0, #ce93d8) secondary, Dark backgrounds (#0a0514)
- **Font:** JetBrains Mono (monospace), Inter (body)
- **Background:** `bg-graffiti.png` texture visible through glass panels

### CSS Architecture
- `globals.css` defines all CSS variables under `:root` / `.dark` selectors
- Two key utility classes:
  - `.floyd-card` — 0.95 opacity dark bg, blur(16px), purple border glow
  - `.glass-panel` — 0.95 opacity, blur(20px), 2px purple border, drop shadow
- Both ensure WCAG AA text contrast against the graffiti background
- Dark mode is default; light mode supported but secondary

### Component Library
35+ Radix/ShadCN components in `components/ui/` — all themed to match the cyberpunk aesthetic via Tailwind config extending CSS variables.

---

## 8. Blog System

### Dual Source
1. **Database** (`blog_posts` table) — primary, checked first
2. **Static data** (`lib/blog-data.ts`) — fallback if DB empty/unreachable

### Content Format
- Markdown stored in `content` field
- Rendered client-side using `marked` library
- Tags stored as `String[]` in Postgres

### Current Posts (5)
1. The Garage Chronicles: Origins Edition
2. The Subscription Hater's Manifesto
3. The Suite
4. The Gospel According to Nick Beard
5. The Gas Station Manifesto

---

## 9. SEO & Metadata

- `metadataBase`: `https://floydslabs.com`
- Open Graph image: `/og-image.png`
- Dynamic `robots.ts`: allows all, disallows `/api/`
- Dynamic `sitemap.ts`: all static pages + blog slugs, includes `/connect` (0.8) and `/api-docs` (0.7)
- Each page exports its own `Metadata` object

---

## 10. Deployment (Vercel)

### Setup
- **Git Integration:** Auto-deploy on push to `main` branch
- **Build Command:** `prisma generate && next build` (set in `vercel.json`)
- **Framework:** Next.js (auto-detected)
- **Node.js:** 18.x (Vercel default)

### Critical: next.config.js for Vercel
The Vercel-clean config must be:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: { unoptimized: true },
};
module.exports = nextConfig;
```
⚠️ Do NOT include `outputFileTracingRoot`, `distDir`, `output`, or custom webpack config — these are Abacus-specific and cause Vercel's `path0/path0` build error.

### Vercel Project Info
- **Team:** `team_0nEd9CwoThv78d03w9BfySZd`
- **Project:** `prj_onnNfGYigKSZg3RbenrYZin86bzr`

---

## 11. Known Issues & Gotchas

| Issue | Details | Workaround |
|-------|---------|------------|
| `next.config.js` divergence | Abacus VM version has `outputFileTracingRoot` that breaks Vercel | Use the clean config (§10) for Vercel |
| Tool name mismatch | 6 tools in server mapping use underscored names not matching DB hyphenated names | `getServerForSkill()` normalizes, but count shows 13/19 for floyd-core |
| Signup test endpoint | Automated tests hit `/api/auth/signup` but real endpoint is `/api/signup` | Pre-existing, not a bug |
| `prisma/schema.prisma` output path | Has Abacus-specific path in `output` field | Remove `output` and `binaryTargets` for Vercel (Prisma auto-detects) |
| Blog static fallback | If DB is unreachable, falls back to `lib/blog-data.ts` which may be stale | Keep both in sync |
| Google SSO cookies | NextAuth v4 requires explicit cookie config for OAuth state persistence | Already configured in `lib/auth.ts` |

---

## 12. Vercel Migration Checklist

When fully migrating from Abacus to Vercel:

- [x] Push code to GitHub (clean structure, no `nextjs_space/` nesting)
- [x] Import to Neon Postgres (all 11 tables, 73 skills)
- [x] Set environment variables in Vercel dashboard
- [ ] Fix `next.config.js` — remove Abacus-specific options
- [ ] Fix `prisma/schema.prisma` — remove `output` and `binaryTargets`
- [ ] Verify Google SSO callback URL in Google Console → `https://floydslabs.com/api/auth/callback/google`
- [ ] Verify custom domain DNS in Vercel
- [ ] Test all routes post-deploy
- [ ] Set up Vercel Analytics (optional)

---

## 13. Quick Reference Commands

```bash
# Local development
yarn install
yarn prisma generate
yarn dev                    # http://localhost:3000

# Database
yarn prisma db push         # Apply schema changes (careful!)
yarn prisma studio          # Visual DB browser
yarn prisma generate        # Regenerate Prisma client

# Seeding
npx tsx scripts/seed.ts     # Initial seed
npx tsx scripts/safe-seed.ts # Non-destructive upsert
npx tsx scripts/populate-skills.ts # Bulk skill import

# Type checking
yarn tsc --noEmit

# Production build
yarn build
yarn start
```

---

## 14. Content Accuracy Reference

These numbers must be consistent across all pages:

| Metric | Value | Where it appears |
|--------|-------|------------------|
| Total Skills | 73 | Homepage, About, Tools, Connect, Layout metadata |
| MCP Servers | 3 | About, Tools, Connect, API Docs |
| Server Names | floyd-core, ai-cognition, ai-orchestration | Connect, Tools, API Docs |
| Mapped Tools | 67 | Connect, API Docs header |
| Ghost Algorithms | 10 | About (stats), Tools (header text) |
| Subscriptions | $0 | Homepage, About, everywhere |
| Cost | $0/month | Homepage stats, Tools |

---

*This document is the single source of truth for the Floyd Labs website. Keep it updated with every significant change.*
