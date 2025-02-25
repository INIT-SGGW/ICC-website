# Stage 1: Build dependencies
FROM node:18-alpine AS installer
WORKDIR /app
# Enable corepack FIRST in base image
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
COPY . .
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
# Re-enable corepack in builder stage
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
COPY --from=installer /app .
RUN pnpm build:admin

# Stage 3: Runner (Update copy commands)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone server
COPY --from=builder /app/apps/admin/.next/standalone ./
# Copy static assets
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
# Copy public folder
COPY --from=builder /app/apps/admin/public ./apps/admin/public

EXPOSE 3000
CMD ["node", "./apps/admin/server.js"]