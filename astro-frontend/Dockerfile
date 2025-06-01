FROM node:22-slim AS base
WORKDIR /app
RUN npm i -g bun
COPY package.json bun.lock ./

FROM base AS prod-deps
RUN bun install --prod

FROM base AS build-deps
WORKDIR /app
RUN bun install

FROM build-deps AS build
WORKDIR /app
ARG PUBLIC_STRAPI_URL
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}
COPY . .
RUN bun run build

FROM base AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE ${PORT}
ENTRYPOINT [ "node","./dist/server/entry.mjs" ]