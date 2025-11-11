# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .
# Standalone output pour une image plus légère
ENV NODE_ENV=production
RUN npx next build

# ---- Runner ----
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
# Copie le serveur standalone + assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# (on ne copie PAS /app/public car il n’existe pas dans ton repo)

EXPOSE 3000
CMD ["node", "server.js"]
