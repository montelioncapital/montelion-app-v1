# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# pas de lockfile -> on n'utilise PAS npm ci
COPY package.json ./
RUN npm install --no-audit --no-fund

# code
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
