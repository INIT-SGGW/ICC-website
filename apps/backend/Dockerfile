# Stage 1: Install dependencies
FROM node:18-alpine AS installer
WORKDIR /app

# Enable corepack and install dependencies
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
COPY . .
RUN pnpm install --frozen-lockfile

# Stage 2: Build application
FROM node:18-alpine AS builder
WORKDIR /app

# Re-enable corepack in builder stage
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
COPY --from=installer /app .
# Build workspace dependencies first
RUN pnpm build --filter "@repo/types"
# Then build the backend
RUN pnpm build --filter "backend"

# Stage 3: Run application
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy package.json files and install production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/packages/types/package.json ./packages/types/

# Copy built packages
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist

# Install production dependencies only
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate && \
    pnpm install --prod --frozen-lockfile

WORKDIR /app/apps/backend

EXPOSE 3000
CMD ["node", "dist/main.js"]
