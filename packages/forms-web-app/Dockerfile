# Stage 1/2: Build
FROM node:20-alpine3.20 AS build

# TODO: Remove this once these get fixed:
# - https://github.com/vercel/turborepo/issues/1097
# - https://github.com/vercel/turborepo/issues/1103
RUN apk update
RUN apk add git ca-certificates
RUN update-ca-certificates

WORKDIR /opt/app

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

COPY package*.json ./
COPY turbo.json ./
COPY packages/common ./packages/common
COPY packages/forms-web-app/src ./packages/forms-web-app/src
COPY packages/forms-web-app/webpack*.js ./packages/forms-web-app/
COPY packages/forms-web-app/package.json ./packages/forms-web-app/package.json


RUN mkdir uploads && \
    chown node:node uploads

RUN npm ci --workspaces --if-present
RUN npm run build

# Stage 2/2: Run app
FROM node:20-alpine3.20 AS prod

# Ensure CA certificates are available in final stage
RUN apk update && \
    apk add ca-certificates && \
    update-ca-certificates

WORKDIR /opt/app

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

# Copy built application from build stage
COPY --from=build /opt/app /opt/app

RUN npm prune --production

WORKDIR /opt/app/packages/forms-web-app

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
