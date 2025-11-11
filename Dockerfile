# --- Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .
# Ensure Next builds as standalone
ENV NODE_ENV=production
RUN npx next build

# --- Runtime ---
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
# copy the minimal standalone server + static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# OPTIONAL: only if you actually have public assets.
# If you *don’t* keep a public dir, keep this commented to avoid build errors.
# COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
