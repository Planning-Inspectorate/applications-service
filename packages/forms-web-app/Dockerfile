# Stage 1/3: Build
FROM node:14-alpine AS build

WORKDIR /opt/app

COPY packages/common ../common
COPY packages/forms-web-app/src ./src
COPY packages/forms-web-app/package*.json ./
COPY packages/forms-web-app/webpack*.js ./

RUN npm i
RUN npm run build


# Stage 2/3: Run tests
FROM node:14-alpine AS test

COPY --from=build /opt/app ./
COPY --from=build /opt/common ../common

COPY packages/forms-web-app/__tests__ ./__tests__
COPY packages/forms-web-app/jest.config.js jest.config.js
COPY packages/forms-web-app/.eslintrc .eslintrc

RUN npm run lint
RUN npm run documentation; echo $? > /npm.exitcode

# Stage 3/3: Run app
FROM node:14-alpine AS app

RUN npm prune --production && npm rebuild

EXPOSE 3000

CMD [ "npm", "run", "start" ]
