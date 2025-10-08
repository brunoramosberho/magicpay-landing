# Node 20 for Next.js 15 runtime
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Expose and start
EXPOSE 3000
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]


