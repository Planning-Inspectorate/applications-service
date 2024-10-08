# Applications Service

Monorepo for all Applications Service services

## TL;DR

- `npm ci` from the project root and in the `e2e-tests` directory- see [Dependencies](#dependencies-npm) below
- create a `.env` file in `./packages/applications-service-api`. Copy the values from `.env.development`
- create a `.env` file in the applications service root folder `/`. Copy the variables from `.env.example` (in the same root folder).  Speak to a colleague to get the actual variable values
- `npm run db:generate` to create database
- `npm run db:migrate:dev` to create tables
- `npm run db:seed` to populate tables with some data 
- `npm run dev`
- Go to [localhost:9004](http://localhost:9004)

## Structure

```
.
+-- e2e-tests
|   +-- cypress
|   |   +-- e2e
|   |   |   +-- ...
|   |   +-- fixtures
|   |   |   +-- ...
|   |   +-- support
|   |   |   +-- ...
|   +-- patches
|   |   |   +-- ...
+-- init
|   +-- mssql
|   |   +-- ...
|   +-- ...
+-- mock-server
+-- packages
|   +-- applications-service-api
|   +-- back-office-subscribers
|   +-- common
|   +-- e2e_tests
|   +-- forms-web-app
|   +-- ni-redirects
```

- **e2e-tests**: Legacy E2E tests. Still maintained as they continue to be a valuable set of regression tests.
- **init**: Scripts to create database tables and seed rows.

### Packages

| Package                  | Description                                                        |
|--------------------------|--------------------------------------------------------------------|
| forms-web-app            | User-facing website                                                |
| applications-service-api | Web API which encapsulates business logic for the website          |
| back-office-subscribers  | Azure Function App for publishing and consuming Service Bus events |
| e2e_tests                | Cypress test suites                                                |


## Architecture

The architecture of the applications service and its relationships with other systems can be viewed through interactive [C4 Model diagrams](https://c4model.com) held as [Structizer](https://docs.structurizr.com) code in the `workspace.dsl` file.

This can be viewed locally through an interactive web interface by running `npm run c4`.

Finally open your web browser to view [http://localhost:8080](http://localhost:8080).

There is also a deployed version of the C4 model available [here](https://planning-inspectorate.github.io/applications-service/master/).

### Redis

The website (forms-web-app) depends on Redis for storing session data.

### MySQL and MSSQL

MySQL is using for the legacy NI database, while MSSQL is used for the CBOS database projection. These must both be running.


## Pre-requisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)


## Node.js

The version in use is defined in the [.nvmrc file](./.nvmrc). It is recommended to use a node version manager, such as [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). Alternatively, locate and install the correct version directly from the [Node.js website](https://nodejs.org/en/download/)

Example, using `nvm`: 

```
nvm install 20.11.1
nvm use 20.11.1
nvm alias default 20
```

The Node.js version in use should closely follow [what is supported by the Azure App Service runtime](https://github.com/Azure/app-service-linux-docs/blob/master/Runtime_Support/node_support.md). From time to time, it may be necessary to update Node.js version to a newer LTS release when support for the current version is ending.

## Dependencies (npm)

The repo uses [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). This allows us to have one node_modules in the root workspace that holds all the project dependencies and a root package.json + package-lock.json that has every dependency + version that's used in the repository listed in it. The individual packages do *not* require package-lock.json files (be careful if using Red Hat Dependency Analytics extension in VS Code as this may automatically generate package-lock.json files when you view individual package.json files). There is an additional node_modules in the `e2e-tests` directory because this is not included in the root workspace.

The current list of workspaces can be found in the root package.json file.

Each workspace in the repo also has a package.json file where its dependency list contains only the dependencies that the workspace requires: the versions are denoted as `*` - they rely on the root package.json for  versioning which helps us keep versioning consistent across the repo. 

**First time installing dependencies**:
- Run `npm ci` from the root of the project (this will use the project's package-lock.json file to sort your local node_modules directory and will avoid creating package-lock.json diffs where they're not expected).
- Run `npm ci` in the `e2e-tests` directory.

**To add a dependency**:
- Add the name and desired version of the dependency to the root package.json (preferably prefixed with a `^` to ensure the most recent minor version is used)
- Add the name of the dependency with the version marked as a `*` to the relevant workspace's package.json file
- Run `npm install` from root - avoid creating + merging package-lock.json files within workspaces

*Note that on build, your dependency will not be available to any workspace in the repo that does not have the dependency listed in its respective package.json file (the code build process ensures that only the necessary dependencies are included in the build (the API and web app packages use `npm ci --workspaces --if-present` in their Dockerfiles to ensure this))*

## Environment Setup

Create a `.env` file in the applications service root folder `\`. Copy the variables from `.env.example` (in the same root folder).  Speak to a colleague to get the actual variable values.

## Running

### Docker

For local development, we use `docker compose` which creates the various Docker containers using the `docker-compose.yml` config.

Each service contains a `Dockerfile`, which is used to create an image to be deployed to remote environments (Docker Compose is not used).

If making changes to containers, be mindful you may need to update both the `Dockerfile` and `docker-compose.yml` so the changes are consistent between local and remote environments.

### Local development

**To run the whole stack**

```shell
npm run dev
```

Then go to [localhost:9004](http://localhost:9004) (forms-web-app) or
[localhost:3000](http://localhost:3000) (applications-service-api)

> A database for local development can be accessed at http://localhost:9000/ via [Adminer](https://www.adminer.org/)
> which can be run in its own container. Uncomment the `adminer` section in `docker-compose.yml` to use it.
> Alternatively, you can use [MySQL Workbench](https://www.mysql.com/products/workbench/) or another GUI tool of your choice.

**To run a single service**

This will run just the `applications-service-api` app:

```shell
npm run dev:api
```

This will run just the `forms-web-app` app:

```shell
npm run dev:web
```

#### Other tips

- If you want to remove any containers to they are rebuilt the next time you run `npm run dev`, you can run:

```shell
docker compose down
```

- If you wish to use the shell of the container:

```shell
npm run dev:api -- sh
```

### Database

Initially, the Applications service used MySQL as a data store which is due to be phased out and replaced with SQL Server. Data will be migrated from one to the other, but during the transition period we will run both with only new data being retrieved from SQL Server. Locally, both are run in Docker containers.

#### SQL Server

First, make sure you have a `.env` file in `./packages/applications-service-api` and it has a `DATABASE_URL` environment variable defined with details pointing to your local database server (`mssql` Docker container);

To set up the SQL Server with tables and some data, you will need to run the following commands (whilst the SQL Server Docker container is running):

```shell
npm run db:generate
npm run db:migrate:dev
npm run db:seed 
```

The ORM used by the application to access SQL Server is [Prisma](https://www.prisma.io/). The schema is defined in [schema.prisma](./packages/applications-service-api/prisma/schema.prisma). 

**Note:** If the `prisma.schema` file has been updated, don't forget to run `npm run db:migrate:dev` to apply the changes.

#### MySQL

The local MySQL database is bootstrapped from sql scripts located in the `./init` directory. Simply running the Docker container should be all the setup needed for running the MySQL database.

### Troubleshooting

On (**npm run dev**), you may get the following error:

```shell
no matching manifest for linux/arm64/v8 in the manifest list entries:
```

This is resolved by entering the following line in the **docker-compose.yml** file in the **db** settings of the **services**:

```yaml
platform: linux/x86_64
```

For example,

```yaml
db:
image: 'mysql'
platform: linux/x86_64 // <----
environment:
// ... etc
```

---

On Windows you may get an error:

  ```shell
  applications-web-app      | node:internal/modules/cjs/loader:998
  applications-web-app      |   throw err;
  applications-web-app      |   ^
  applications-web-app      |
  applications-web-app      | Error: Cannot find module '@pins/common/src/utils/redis'
  applications-web-app      | Require stack:
  applications-web-app      | - /opt/app/packages/forms-web-app/src/config.js
  applications-web-app      | - /opt/app/packages/forms-web-app/src/server.js
  applications-web-app      |     at Function.Module._resolveFilename (node:internal/modules/cjs/loader:995:15)
  applications-web-app      |     at Function.Module._load (node:internal/modules/cjs/loader:841:27)
  applications-web-app      |     at Module.require (node:internal/modules/cjs/loader:1067:19)
  applications-web-app      |     at require (node:internal/modules/cjs/helpers:103:18)
  applications-web-app      |     at Object.<anonymous> (/opt/app/packages/forms-web-app/src/config.js:1:40)
  applications-web-app      |     at Module._compile (node:internal/modules/cjs/loader:1165:14)
  applications-web-app      |     at Object.Module._extensions..js (node:internal/modules/cjs/loader:1219:10)
  applications-web-app      |     at Module.load (node:internal/modules/cjs/loader:1043:32)
  applications-web-app      |     at Function.Module._load (node:internal/modules/cjs/loader:878:12)
  applications-web-app      |     at Module.require (node:internal/modules/cjs/loader:1067:19) {
  applications-web-app      |   code: 'MODULE_NOT_FOUND',
  applications-web-app      |   requireStack: [
  applications-web-app      |     '/opt/app/packages/forms-web-app/src/config.js',
  applications-web-app      |     '/opt/app/packages/forms-web-app/src/server.js'
  applications-web-app      |   ]
  applications-web-app      | }
  ```
  
  A workaround is to run `npm run win:common:fix` after any `npm i`

---
  
Prisma errors 

```shell
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues
  at new PrismaClient (/opt/app/node_modules/.prisma/client/index.js:3:11)
  at exports.createPrismaClient (/opt/app/packages/applications-service-api/src/lib/prisma.js:7:26)
```
    
- Run `npm run db:generate` to re-generate the Prisma client. This should only be necessary on your first setup, after removing `node_modules`, or upgrading the Prisma version.

```shell
PrismaClientInitializationError: Query engine library for current platform "linux-musl" could not be found.
You incorrectly pinned it to linux-musl

This probably happens, because you built Prisma Client on a different platform.
(Prisma Client looked in "/opt/app/node_modules/@prisma/client/runtime/libquery_engine-linux-musl.so.node")
```

- Add the platform (in this case `"linux-musl"`) to `binaryTargets` in `prisma.schema` then run `npm run db:generate` 

On running `npm run db:seed` you may see the error: 

```shell
prisma:error Violation of PRIMARY KEY constraint 'ServiceUser_pkey'. Cannot insert duplicate key in object 'dbo.ServiceUser'. The duplicate key value is (99)
```

- Run `npm run db:reset` which will reset the database, apply all migrations and run the seed script
  
## Branching

Please follow the established [branching strategy](https://pins-ds.atlassian.net/wiki/spaces/AAPDS/pages/425132090/Branching+strategy).
In the event of divergence from the README, the external document will take
precedence.

All commit messages must be written in the [Conventional Commit Format](#commit-message-format).
This uses [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
to generate the release numbers for the artifacts.

## Deployments

- Builds in Azure DevOps are triggered automatically when pushing a branch or opening a PR on Github
- Merging a PR will trigger a deployment to the `dev` environment (`main` branch is deployed)
- Deploying to the `test` environment is manual. Run the `Applications Service Deploy` pipeline in Azure DevOps to do this.

## Releases

- Run the `Applications Service Release` pipeline in Azure DevOps to release to production
- The pipeline uses [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) to generate git tags, release notes and a [release on Github](https://github.com/Planning-Inspectorate/applications-service/releases), before deploying the build to the production environment

## Code convention, linting, etc

### Automatically format and lint code on git commit

We use [husky](https://typicode.github.io/husky/#/) to format and lint code before committing.
These are installed automatically when running `npm ci`.

### Commit Message Format

This repo uses [Semantic Release](https://semantic-release.gitbook.io) to
generate release version numbers, so it is imperative that all commits are
done using the [correct format](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Commits to the `main` branch will create release candidates. These are a release
of software that may or may not be made public. Under normal circumstance, releases
should be made directly to the `main` branch.

### Commit Message Rules

Commit messages dictate how the software is released. You must ensure that you are
using the correct commit type. Commit messages starting `feat` or `fix` will trigger
a new release - other types such as `chore`, `docs` or `test` won't create a new
release. These should be used appropriately - for instance, if you are refactoring the
repo structure without changing any of the application, this would be appropriate to
use `chore`. If you are fixing a bug then `fix` should be used. A new feature should
use the type `feat`.

You can mix-and-match inside a PR - the CI/CD pipelines will take the highest ranked
commit type and make a release based on that. For instance, a PR with many `chore`
and one `feat` will produce a new release bumping the minor semantic version number.
Without the `feat`, it would create no new release.

### Ensure Linear Commits

It's very important that PRs have linear commits. There can be multiple commits per PR
(if appropriate), but they should be linear. An example of a non-linear commit is:

```shell
7fa9388 (feature/my-wonderful-feature): feat(some-brilliant-feat): this is a brilliant feature I've worked hard on
bf2a09e erm, not sure why CI has broken so another go
067c88e gah, I'm stupid. I can see why CI broke
```

```shell
6fd721a (feature/my-wonderful-feature): feat(some-brilliant-feat): this is a brilliant feature I've worked hard on
```

Linear commits are much easier to find problems when tracing through Git history.

### Commitizen

To automatically generate the format correctly, please use Commitizen to make
all commits to this repo. This repo is
[Commitizen-friendly](https://github.com/commitizen/cz-cli).

There is linting on commit messages in the repo, both in GitHub Actions and
as a commit hook.

Either:

    npm install -g commitizen

And then:

    git add .
    git cz

Or:

    git add .
    npm run commit

### Logging

We use the logger [Pino](http://getpino.io), and [express-pino-logger](https://github.com/pinojs/express-pino-logger). Import the logger and use `logger.info`, `logger.error`, etc rather than `console.log` as this will ensure logs are formatted in a way that Azure can collect.

Please see [Confluence](https://pins-ds.atlassian.net/wiki/spaces/AAPDS/pages/edit-v2/554205478) for further information

### Tests

Run unit tests from the /applications-service/packages/forms-web-app folder with:

```shell
npm run test
```

If snapshots need to be updated, from the /applications-service/packages/forms-web-app folder run:

```shell
npm run test:update
```


