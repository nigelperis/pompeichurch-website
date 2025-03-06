FROM node:22-alpine as builder
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1 py3-setuptools
RUN npm install --global corepack@latest
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
RUN corepack enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN pnpm install -g node-gyp

# PACKAGE INSTALLATION
# Install dependencies in a separate directory to optimize caching and allow efficient copying of node_modules in the runner stage.
WORKDIR /build
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --prod
ENV PATH="/build/node_modules/.bin:$PATH"

# CODE BUILD
# To optimize caching and execute commands on all files except node_modules in the later stage,
# create a subdirectory, copy source files, and build the output distribution.
WORKDIR /build/outputs
COPY . .
RUN pnpm run build

# RUNNER STAGE
FROM node:20-alpine3.20 as runner
RUN apk add --no-cache vips-dev
RUN npm install --global -y corepack@latest
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
RUN corepack enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules
ENV PATH="/app/node_modules/.bin:$PATH"

# Creating a subdirectory helps change file permissions for all files except node_modules.
WORKDIR /app/outputs
COPY --from=builder /build/outputs ./

# RUNTIME CONFIGURATION
RUN chown -R node:node /app/outputs
EXPOSE 1337
ENTRYPOINT ["pnpm","start"]