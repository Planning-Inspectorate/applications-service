# Applications Service

Monorepo for all Applications Service services and infrastructure

## TL;DR

- `make install`
- `make serve`
- Go to [localhost:9004](http://localhost:9004)

## Pre-requisites

- [NodeJS v14](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## NodeJS

Install NodeJS using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```
nvm install 14
nvm use 14
nvm alias default 14
```

### Dependencies

You will need to install the dependencies locally, even though we're using
Docker Compose to run locally.

The easiest way to do that is to run `make install`, which will cycle through
every folder and install npm dependencies.

## Running

> Docker and Docker Compose are both very well documented. Please check their
> documentation for advice on running it in development.

To run the development stack, you can run this in Docker Compose. This will
run all services, including databases, and pre-fill all stubbed data into the
databases.

To run the whole stack:

```
make serve
```

Then go to [localhost:9004](http://localhost:9004) (forms-web-app) or
[localhost:3000](http://localhost:3000) (applications-service-api)

> As a convention, public facing web service will use the port range `9000-9999`
> and API services will use the port range `3000-3999`

> A database for local development can be accessed at http://localhost:9000/ via [Adminer](https://www.adminer.org/) 
> which is running in its own container locally 
> Alternatively, you can use [MySQL Workbench](https://www.mysql.com/products/workbench/)

To run a single service (and it's dependencies):

```
make run SERVICE=applications-service-api
```

This will run just the `applications-service-api` app. Change the `SERVICE` for
different services.

---

If you wish to use the shell of the container (useful if you want to install
new npm dependencies):

```
make run SERVICE=applications-service-api CMD=sh
```

---

To stop all services:

```
make down
```

### Issues with Running the Server

When trying to start the server (**make serve**), with Docker Compose up and running, with some OS versions this message is output:
```
no matching manifest for linux/arm64/v8 in the manifest list entries:
```
Example output message:

``` 
docker-compose up
[+] Running 1/17
 ⠇ db Pulling                                                                                             1.8s
 ⠇ adminer Pulling                                                                                           1.8s
  ⠿ 552d1f2373af Already exists                                                                                    0.0s
  ⠋ f327d3d40ef4 Pulling fs layer                                                                                   0.0s
  ⠋ a3586b69bdc1 Pulling fs layer                                                                                   0.0s
  ⠋ 226a5565cd99 Pulling fs layer                                                                                   0.0s
  ⠋ a29c49208f73 Waiting                                                                                       0.0s
  ⠋ e04acff31b30 Waiting                                                                                       0.0s
  ⠋ 1fd966f11fdc Waiting                                                                                       0.0s
  ⠋ af329026e61b Waiting                                                                                       0.0s
  ⠋ d1c16c674cf6 Waiting                                                                                       0.0s
  ⠋ 1f79445e9e05 Waiting                                                                                       0.0s
  ⠋ 102c95209aff Waiting                                                                                       0.0s
  ⠋ d8471d71259d Waiting                                                                                       0.0s
  ⠋ ab023144139a Waiting                                                                                       0.0s
  ⠋ c9a46da6deea Waiting                                                                                       0.0s
  ⠋ 2653012098a8 Waiting                                                                                       0.0s
no matching manifest for linux/arm64/v8 in the manifest list entries
```

This is resolved by entering the following line in the **docker-compose.yml** file in the **db** configuration of the **services**:

```
platform: linux/x86_64
```

Example with the line '**platform: linux/x86_64**' added in the **docker-compose.yml** file:

```
db:
  image: 'mysql'
  cap_add:

   SYS_NICE # CAP_SYS_NICE

  command: '--default-authentication-plugin=mysql_native_password'
  restart: 'always'
  environment:
   MYSQL_ROOT_PASSWORD: 'root'
   MYSQL_DATABASE: 'ipclive'
   MYSQL_USER: 'pins'
   MYSQL_PASSWORD: 'pins'
   platform: linux/x86_64
  ports:

 '3306:3306'

  volumes:

'./init:/docker-entrypoint-initdb.d'
```


## Branching

Please follow the established [branching strategy](https://pins-ds.atlassian.net/wiki/spaces/AAPDS/pages/425132090/Branching+strategy).
In the event of divergence from the README, the external document will take
precedence.

All commit messages must be written in the [Conventional Commit Format](#commit-message-format).
This uses [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
to generate the release numbers for the artifacts.

## Releases

TO DO 

## Deployments

TO DO 

## Commit Message Format

This repo uses [Semantic Release](https://semantic-release.gitbook.io) to
generate release version numbers, so it is imperative that all commits are
done using the [correct format](https://www.conventionalcommits.org/en/v1.0.0/#specification).

Commits to the `develop` branch will create release candidates. These are a release
of software that may or may not be made public. Under normal circumstance, releases
should be made directly to the `master` branch.

## Commit Message Rules

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

## Checking The Correct Release Has Been Deployed

1. Check your PR has passed. If there are any failures, check these to see if the
   reasons for failure give a clue as to what went wrong (and then fix). There is a job
   called `Next version` which will tell you the version number that this should create
   if successful.
2. Check a [new release was made](https://github.com/Planning-Inspectorate/applications-service/releases).
   Dependent upon whether it was made from the `develop` or `master` branch, you will be
   looking for either a pre-release version or a release. If no release has been made,
   ensure that your commit message was formatted correctly and begins with `feat` or `fix`.
3. Check the [/releases](https://github.com/Planning-Inspectorate/applications-service/tree/master/releases)
   folder against the cluster you are expecting to see it deployed on. If the `app.yml` file does
   not contain the tag you are expecting then the deployment may have failed. It takes up to
   5 minutes for a new release to be detected.

## Ensure Linear Commits

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

## Commitizen

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


## Logging

> Please see [Confluence](https://pins-ds.atlassian.net/wiki/spaces/AAPDS/pages/edit-v2/554205478) for further information

tl;dr If in controller/middleware, use `req.log`, otherwise `*/src/lib/logger.js`. We use the logger [Pino](http://getpino.io),
and [express-pino-logger](https://github.com/pinojs/express-pino-logger).

### Logging Levels

This is an overview of the different levels available in Pino, in order of least to most verbose.

| Level | Description                                                                                                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fatal | To be used if the application is going down. Typically this won't be used in the application.                                                                                                           |
| Error | To be used if an error has occurred. This will most likely be a `try/catch` but not exclusively. If an `Error` object is present, always send it to the logger - `log.error({ err }, 'error message')`. |
| Warn  | To be used when something has happened that is not ideal, but may not result in an error being thrown. Typically, this would be used when a user has failed validation.                                 |
| Info  | To be used when recording normal information about a process. This is likely to be the most used level.                                                                                                 |
| Debug | Information to be used when debugging a problem.                                                                                                                                                        |
| Trace | The most verbose level.                                                                                                                                                                                 |

### try/catch

Always log try / catch statements. Good practice:

```javascript
try {
  log.debug('this is something happening');
} catch (err) {
  log.error({ err }, 'error message');
  throw err;
}
```

### Child

Sometimes it makes sense to logically group log messages. We can achieve this with a [child logger](https://getpino.io/#/docs/child-loggers).
Typically, you will need to add some identifying detail to associate the logs together, a good example would be using `uuid.v4()`.

```javascript
const log = logger.child({ someId: uuid.v4() });
log.info('an informational message');
```
