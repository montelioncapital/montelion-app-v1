# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# --- Run stage ---------------------------------------------------------------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Next.js standalone server + assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# (pas de dossier public à copier)

EXPOSE 3000
CMD ["node", "server.js"]
