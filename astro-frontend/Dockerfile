# Stage 1:
FROM node:20.14.0-slim AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install prod dependencies only (--prod excludes dev dependency)
RUN pnpm install --prod

# Copy the rest app files
COPY . .

# Build
RUN pnpm build

# Stage 2: (Multi stage)
FROM nginx:stable

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the dist files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]

# Build locally: docker build -it appname .
# Run build: docker run 80:80 appname