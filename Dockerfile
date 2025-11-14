# --- build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# installer les dépendances
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# copier tout le projet (y compris public/legal/...)
COPY . .

# build Next en mode production (standalone)
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# copie la sortie "standalone" générée par Next
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static .next/static

# 🔥 IMPORTANT : copier aussi le dossier public (ton PDF est là)
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
