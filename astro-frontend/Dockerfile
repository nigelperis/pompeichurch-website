FROM node:24.11.1-slim AS base
WORKDIR /app
RUN npm i -g bun

# Install all dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install

# Build app with full deps
FROM deps AS build
ARG PUBLIC_STRAPI_URL
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}
ARG PUBLIC_ENVIRONMENT
ENV PUBLIC_ENVIRONMENT=${PUBLIC_ENVIRONMENT}
COPY . .
RUN bun run build

# Runtime: copy only production deps + built files
FROM base AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json bun.lock ./

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE ${PORT}
ENTRYPOINT [ "node", "./dist/server/entry.mjs" ]
