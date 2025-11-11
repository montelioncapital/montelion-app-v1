# --- Build stage -------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Dépendances
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Code + build Next en mode standalone
COPY . .
RUN npm run build

# --- Run stage ---------------------------------------------------------------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# On copie le serveur standalone généré par Next
# => .next/standalone contient server.js et tout le node_modules minimal
COPY --from=builder /app/.next/standalone ./
# Assets statiques
COPY --from=builder /app/.next/static ./.next/static
# (optionnel) public/
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
