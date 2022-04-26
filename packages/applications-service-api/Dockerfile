# Stage 1/3: Build
FROM node:14-alpine AS build

WORKDIR /opt/app

COPY packages/applications-service-api/api ./api
COPY packages/applications-service-api/data ./data
COPY packages/applications-service-api/src ./src
COPY packages/applications-service-api/package*.json ./
COPY packages/applications-service-api/.sequelizerc .sequelizerc

RUN npm i

# Stage 2/3: Run tests
FROM node:14-alpine AS test

WORKDIR /opt/app

COPY --from=build /opt/app ./

COPY packages/applications-service-api/__tests__ ./__tests__
COPY packages/applications-service-api/jest.config.js jest.config.js
COPY packages/applications-service-api/.eslint* ./
COPY packages/applications-service-api/.prettier* ./

RUN npm run lint
RUN npm run documentation; echo $? > /npm.exitcode

# Stage 3/3: Run app
FROM node:14-alpine AS app

WORKDIR /opt/app

COPY --from=build /opt/app ./

RUN npm prune --production

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
