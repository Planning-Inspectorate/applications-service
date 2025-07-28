# Stage 1/2: Build
FROM node:20-alpine3.20 AS build

# TODO: Remove this once these get fixed:
# - https://github.com/vercel/turborepo/issues/1097
# - https://github.com/vercel/turborepo/issues/1103
RUN apk update
RUN apk add git

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

WORKDIR /opt/app

COPY package*.json ./
COPY turbo.json ./
COPY packages/common ./packages/common
COPY packages/applications-service-api/api ./packages/applications-service-api/api
COPY packages/applications-service-api/data ./packages/applications-service-api/data
COPY packages/applications-service-api/prisma ./packages/applications-service-api/prisma
COPY packages/applications-service-api/src ./packages/applications-service-api/src
COPY packages/applications-service-api/package.json ./packages/applications-service-api/package.json
COPY packages/applications-service-api/.sequelizerc ./packages/applications-service-api/.sequelizerc

RUN mkdir uploads && \
    chown node:node uploads

RUN npm ci --workspaces --if-present

# Stage 2/2: Run app
FROM build AS app

WORKDIR /opt/app

RUN npm prune --production

WORKDIR /opt/app/packages/applications-service-api

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

RUN npx prisma generate

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
