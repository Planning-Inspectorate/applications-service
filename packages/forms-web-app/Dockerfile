# Stage 1/2: Build
FROM node:20-alpine AS build

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
FROM build AS prod

WORKDIR /opt/app

ARG GIT_SHA
ENV GIT_SHA=$GIT_SHA

RUN npm prune --production

WORKDIR /opt/app/packages/forms-web-app

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
