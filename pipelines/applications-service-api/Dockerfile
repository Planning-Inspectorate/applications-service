FROM node:14

ARG VERSION
ENV VERSION="${VERSION}"

WORKDIR /opt/app

RUN mkdir -p /opt/app/data

ADD api api
ADD src src
ADD __tests__ __tests__
ADD jest.config.js jest.config.js
ADD data data
ADD package.json package.json
ADD .sequelizerc .sequelizerc
ADD package-lock.json package-lock.json

RUN npm i
RUN npm run documentation
RUN npm prune --production

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
