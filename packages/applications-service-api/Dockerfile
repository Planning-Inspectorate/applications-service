# Stage 1/2: Build
FROM node:16-alpine AS build

# TODO: Remove this once these get fixed:
# - https://github.com/vercel/turborepo/issues/1097
# - https://github.com/vercel/turborepo/issues/1103
RUN apk update
RUN apk add git

WORKDIR /opt/app

COPY package*.json ./
COPY turbo.json ./
COPY packages/applications-service-api/api ./packages/applications-service-api/api
COPY packages/applications-service-api/data ./packages/applications-service-api/data
COPY packages/applications-service-api/src ./packages/applications-service-api/src
COPY packages/applications-service-api/package.json ./packages/applications-service-api/package.json
COPY packages/applications-service-api/.sequelizerc ./packages/applications-service-api/.sequelizerc

RUN npm ci

# Stage 2/2: Run app
FROM build AS app

WORKDIR /opt/app

RUN npm prune --production

WORKDIR /opt/app/packages/applications-service-api

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
