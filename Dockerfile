# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js app for standalone output
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set the NODE_ENV to 'production'
ENV NODE_ENV=production
ENV PORT=3000

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the public and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
