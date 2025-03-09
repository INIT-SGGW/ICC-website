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
RUN pnpm build:backend

# Stage 3: Run application
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/apps/backend/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
