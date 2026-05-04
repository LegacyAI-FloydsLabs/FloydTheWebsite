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
