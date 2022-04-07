FROM node:14

ARG VERSION
ENV VERSION="${VERSION}"

WORKDIR /opt/app

# This must be built locally from the common package
COPY --from=pinscrsharedtoolinguks.azurecr.io/applications-service/common:latest /opt/app ../common

ADD package.json package.json
ADD package-lock.json package-lock.json
ADD __tests__ __tests__
ADD jest.config.js jest.config.js

RUN npm i
COPY . ./

RUN npm run build
RUN npm prune --production \
  && npm rebuild \
  && npm version ${VERSION} --no-git-tag-version --allow-same-version || true

RUN npm run documentation
EXPOSE 3000

CMD [ "npm", "run", "start" ]
