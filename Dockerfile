# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Installer deps
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copier le code et builder en "standalone"
COPY . .
RUN npm run build

# --- Run stage ---------------------------------------------------------------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copie le bundle standalone + assets publics
# (Next place server.js inside .next/standalone/)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
# Démarre le serveur Next standalone
CMD ["node", "server.js"]
