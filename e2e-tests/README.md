# Cypress E2E tests

This directory contains the legacy Cypress + Cucumber regression suite for the applications service.

## What these tests cover

The suite covers both:

- the public guidance pages under "Have your say"
- the "Register to have your say" journey itself, including registration steps and completion pages

Examples:

- `cypress/e2e/start-page.feature`
- `cypress/e2e/register-to-say-about-national-infra-project.feature`
- `cypress/e2e/say-about-national-infra-project.feature`
- `cypress/e2e/registration/**/*.feature`

## Test data

These tests do **not** create fresh projects or cases for each run.

They rely on seeded or mocked application data that is already available in the local stack. A lot of the suite is hardcoded to specific projects and case references such as:

- `North Lincolnshire Green Energy Park`
- `EN010116`
- `Cleve Hill Solar Park`
- `Hinkley Point C New Nuclear Power Station Material Change 1`

Because of that, you should seed the local database before running the suite.

Some registration scenarios do submit new registrations against those existing seeded cases. They use fixed names, emails and phone numbers in the test steps, so these tests are best treated as local regression tests against seeded data rather than isolated disposable environments.

## Prerequisites

- Node.js 22
- Docker

Install dependencies in both places:

```shell
npm ci
npm --prefix e2e-tests ci
```

If the API package does not yet have a local `.env`, you can create it from the checked-in development template with:

```shell
cp packages/applications-service-api/.env.development packages/applications-service-api/.env
```

## Local setup

From the repo root:

1. Create the required `.env` files described in the root `README.md`.
2. Generate Prisma client and prepare the local database:

```shell
docker compose up -d mssql
npm run db:generate
npm run db:migrate:dev
npm run db:seed
```

3. Start the local stack:

```shell
npm run dev
```

The web app should then be available at [http://localhost:9004](http://localhost:9004).

## Running the tests

The Cypress config lives in `e2e-tests/cypress.config.js` and defaults to `http://localhost:9004`.

### Open Cypress interactively

```shell
npm --prefix e2e-tests run test:open
```

### Run the default E2E suite headlessly

```shell
npm --prefix e2e-tests run test:e2e
```

This runs feature files under `cypress/e2e/**/*.feature` and excludes `@wip` and `@ignore`.

### Run in headed mode with demo delay

```shell
npm --prefix e2e-tests run test:e2e:demo
```

### Run a subset by tag

Run from the `e2e-tests` directory:

```shell
npx cypress-tags run -b chrome --env TAGS="@registration and @myself"
```

Examples:

```shell
npx cypress-tags run -b chrome --env TAGS="@testSuite"
npx cypress-tags run -b chrome --env TAGS="@registration and @completion"
```

### Run a specific feature file

Run from the `e2e-tests` directory:

```shell
npx cypress-tags run -b chrome --spec "cypress/e2e/register-to-say-about-national-infra-project.feature"
```

### Run a directory of features

Run from the `e2e-tests` directory:

```shell
npx cypress-tags run -b chrome --spec "cypress/e2e/registration/myself/**/*.feature"
```

## Running against another environment

By default Cypress uses the `baseUrl` from `cypress.config.js`, currently `http://localhost:9004`.

You can override it with `CYPRESS_BASE_URL`, for example:

```shell
CYPRESS_BASE_URL=http://application-planning-decision.planninginspectorate.gov.uk npm --prefix e2e-tests run test:e2e
```

If the target environment uses HTTP Basic auth:

```shell
CYPRESS_BASE_URL=http://hello:world@applications-dev.planninginspectorate.gov.uk npm --prefix e2e-tests run test:e2e
```

## Reporting

After a run, you can post-process the generated cucumber JSON into an HTML report:

```shell
npm --prefix e2e-tests run test:e2e:postprocess
```

## Accessibility testing

Accessibility support is wired in through `cypress-axe`, but the automatic page checks are currently commented out in the suite.

If you want to experiment with enabling them, review:

- `cypress/support/accessibility.js`
- `cypress/support/common-methods/assertUserOnThePage.js`
