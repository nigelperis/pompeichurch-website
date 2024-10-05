# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install both production and development dependencies
RUN pnpm install

# Copy the rest of the application files to the container
COPY . .

# Build the TypeScript files (assuming a `build` script in package.json that compiles the TypeScript code)
RUN pnpm run build

# Stage 2: Prepare the production image
# FROM node:18-alpine

# Install pnpm globally again for the production image
# RUN npm install -g pnpm

# Set the working directory
# WORKDIR /app

# Copy only the production dependencies
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Copy the build output from the builder stage
# COPY --from=builder /app/dist ./dist

# Copy necessary Strapi files (e.g., public uploads, config files)
# COPY --from=builder /app/config ./config
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/extensions ./extensions

# Expose port
EXPOSE 1337

CMD ["pnpm", "run", "start"]

#TODO multi stage fix