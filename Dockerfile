# ---- deps ----
FROM node:24-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests only (cache-friendly layer)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json tsconfig.json ./
COPY lib/db/package.json lib/db/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY lib/api-spec/package.json lib/api-spec/
COPY artifacts/api-server/package.json artifacts/api-server/
COPY artifacts/pointers-consulting/package.json artifacts/pointers-consulting/

RUN pnpm install --frozen-lockfile

# ---- build-frontend ----
FROM deps AS build-frontend
COPY . .
ENV PORT=3000
ENV BASE_PATH=/
RUN pnpm --filter @workspace/pointers-consulting run build

# ---- build-api ----
FROM deps AS build-api
COPY . .
RUN pnpm --filter @workspace/api-server run build

# ---- runner ----
FROM node:24-alpine AS runner
WORKDIR /app

# API bundle
COPY --from=build-api /app/artifacts/api-server/dist ./dist

# React static files (served by sirv)
COPY --from=build-frontend /app/artifacts/pointers-consulting/dist/public ./public

# better-sqlite3 is externalized by esbuild — copy from pnpm virtual store
COPY --from=deps /app/node_modules/.pnpm/better-sqlite3@11.10.0/node_modules/better-sqlite3 ./node_modules/better-sqlite3

RUN mkdir -p /data

ENV PORT=3000
ENV DATABASE_PATH=/data/blog.db
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
