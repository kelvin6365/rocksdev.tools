# Stage 1: Building the code
FROM node:18.17.0-alpine3.17 as builder

# Define the environment variables
ARG ENV
ARG VERSION

# Environment variables validation
RUN test -n "$VERSION" || (echo "VERSION not set" && false)
RUN test -n "$ENV" || (echo "ENV not set" && false)

RUN npm i -g pnpm
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files first
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy the rest of the code
COPY . .

# Install production dependencies
RUN pnpm install

# Build the project
RUN pnpm run build

# Stage 2: Run the built code
FROM node:18.17.0-alpine3.17

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

# Copy the built files and node_modules from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/node_modules ./node_modules

# Set the NODE_ENV environment variable
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Health check (if applicable)
# HEALTHCHECK --interval=30s --timeout=5s \
#   CMD curl -f http://localhost:3000/health || exit 1

# Command to run the app
CMD ["node", "server.js"]