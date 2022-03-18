FROM node:14
ARG APP_NAME
ARG BUILD_ID
ARG VERSION
WORKDIR /opt/app
ENV APP_NAME="${APP_NAME}"
ENV BUILD_ID="${BUILD_ID}"
ENV VERSION="${VERSION}"
RUN mkdir -p /opt/app/data

ADD api api
ADD src src
ADD __tests__ __tests__
ADD jest.config.js jest.config.js
ADD data data

ADD package.json package.json
ADD .sequelizerc .sequelizerc
ADD package-lock.json package-lock.json

RUN npm i --production
RUN npm run documentation; echo $? > /npm.exitcode
EXPOSE 3000
USER node
CMD [ "npm", "start" ]
