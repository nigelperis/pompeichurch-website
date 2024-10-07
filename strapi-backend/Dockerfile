FROM node:18-alpine as builder

WORKDIR /strapi

# Resolve node_modules for caching
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

# Copy all for build and release cache if package.json update
COPY . .
ENV NODE_ENV=production

RUN pnpm run build

#

# Create new namespace for final Docker Image
FROM node:18-alpine

RUN npm install -g pnpm

# Only copy your source code without system file
COPY --from=builder /strapi /strapi

WORKDIR /strapi

EXPOSE 1337

ENV NODE_ENV=production
ENV STRAPI_LOG_LEVEL=debug

CMD ["pnpm", "run", "start"]