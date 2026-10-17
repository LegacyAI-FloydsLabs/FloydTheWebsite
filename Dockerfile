# FloydTheWebsite on Cloud Run — per HANDOFF.md §10 (Vercel-clean config).
# Uses the repo's own pinned Yarn release (.yarnrc.yml -> .yarn/releases).
FROM node:20-slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY . .

# Build-time placeholders; real values are injected at runtime by Cloud Run.
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET=build-placeholder
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=http://localhost:3000

RUN corepack enable && corepack yarn install --frozen-lockfile \
    && corepack yarn prisma generate \
    && corepack yarn build

ENV PORT=8080
CMD ["corepack", "yarn", "start", "-p", "8080"]
