# Stage 1/2: Build
FROM node:14-alpine AS build

WORKDIR /opt/app

COPY packages/applications-service-api/api ./api
COPY packages/applications-service-api/data ./data
COPY packages/applications-service-api/src ./src
COPY packages/applications-service-api/package*.json ./
COPY packages/applications-service-api/.sequelizerc .sequelizerc

RUN npm i

# Stage 2/2: Run app
FROM node:14-alpine AS app

WORKDIR /opt/app

COPY --from=build /opt/app ./

RUN npm prune --production

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
