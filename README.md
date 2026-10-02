# Floyd Labs — Legacy AI

> Garage-Born AI from Brown County, Indiana.
> 73+ tools. $0 subscriptions. Always.

A Next.js 14 application powering [floydslabs.com](https://floydslabs.com) and the Floyd Labs MCP Server Farm.

## Stack
- Next.js 14 (App Router)
- PostgreSQL via Prisma (Neon)
- NextAuth.js (Credentials + Google SSO)
- Vercel hosting
- Tailwind CSS

## Local Development
```bash
yarn install
cp .env.example .env   # fill in values
yarn prisma generate
yarn dev
```

## Deployment
Auto-deploys to Vercel on push to `main`.

## Proving Ground previews

The refreshed Floyd Labs Proving Ground lives in `apps/proving-ground`.
Its workshop artwork, public release hub and responsive pages deploy as an
independent Next.js site. The database-backed website and MCP API stay at the
repository root.

Push work to `preview` or a feature branch. Vercel builds that commit and
provides a preview URL. Open a pull request to `main`, inspect the preview,
and let the quality checks finish before merging. `main` is the production
branch; preview pushes do not update production.

```sh
cd apps/proving-ground
npm ci
npm run check
npm run dev
```

The local preview uses port 17453. No database credentials or Vercel token are
needed for this package. The contact form is explicitly a demonstration;
admin links use the existing production login.
