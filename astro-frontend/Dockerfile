FROM node:22-slim AS base
WORKDIR /app
RUN npm i -g corepack
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
WORKDIR /app
RUN pnpm install

FROM build-deps AS build
WORKDIR /app
ARG STRAPI_URL
ENV STRAPI_URL=${STRAPI_URL}
COPY . .
RUN pnpm build

FROM base AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE ${PORT}
ENTRYPOINT [ "node","./dist/server/entry.mjs" ]