# --- build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# install deps with a clean, reproducible cache
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# build
COPY . .
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine
WORKDIR /app

# copy the standalone server and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# (no /app/public copy — the folder may not exist)
EXPOSE 3000
ENV PORT=3000 NODE_ENV=production

CMD ["node", "server.js"]
