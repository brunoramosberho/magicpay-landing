# Node 20 for Next.js 15 runtime
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --include=dev

# Build application
COPY . .
RUN npm run build

# Expose and start
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]


