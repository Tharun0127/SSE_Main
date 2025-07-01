# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js app
# The `standalone` output mode is already set in next.config.ts
RUN npm run build

# Stage 2: Create the final production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security purposes
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy only the necessary files from the builder stage
# This includes the standalone server, public assets, and static build outputs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the environment variable for the port
ENV PORT 3000

# The command to start the server
CMD ["node", "server.js"]
