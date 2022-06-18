# Stage 1/2: Build
FROM node:14-alpine AS build

WORKDIR /opt/app

COPY packages/common ../common
COPY packages/forms-web-app/src ./src
COPY packages/forms-web-app/package*.json ./
COPY packages/forms-web-app/webpack*.js ./

RUN npm i
RUN npm run build

# Stage 2/2: Run app
FROM build AS app

WORKDIR /opt/app

RUN npm prune --production && npm rebuild

EXPOSE 3000

CMD [ "npm", "run", "start" ]
