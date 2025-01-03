# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:20-slim AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
CMD ["node", "dist/main"]

# Development stage
FROM node:20 AS development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Start the app with debugging and hot-reloading enabled
CMD ["yarn", "start:debug"]

# Final stage selection
FROM ${NODE_ENV:-development}
