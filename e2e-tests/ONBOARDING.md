# E2E Onboarding

If you're new to this repo, don't worry too much about the folder structure at first. It has grown over time, so it can look a bit uneven, but once you know where to start it becomes much easier to navigate.

## What this test suite is

The end-to-end tests live in [`e2e-tests/`](./README.md). They use Cypress with Cucumber-style feature files.

Most tests have 3 parts:

- a `.feature` file, which says what the test is doing in plain English
- a step definition `.js` file, which contains the steps behind it
- sometimes a page object, which holds selectors and page interactions

If you are trying to understand a test, always start with the `.feature` file first.

## How the folders are organised

The main test folder is [`cypress/e2e/`](./cypress/e2e).

The suite is broadly split into:

- general site and guidance page tests at the top level
- project-related tests under [`cypress/e2e/projects/`](./cypress/e2e/projects)
- registration journey tests under [`cypress/e2e/registration/`](./cypress/e2e/registration)

The registration area is the neatest bit. It is grouped by who is registering:

- `myself`
- `agent`
- `organisation`

The project area is grouped by feature or journey, for example:

- documents
- project information
- examination timetable
- relevant representations
- section 51 advice

One thing to know up front: the structure is not perfectly consistent. Some feature files sit at the root of `cypress/e2e`, while the matching step files sit in a folder with the same name. Some newer project tests are grouped a bit more neatly by domain. So if it feels a bit all over the place at first, that’s a fair reaction.

The easiest way to find your way around is:

1. open the `.feature` file
2. find the matching step definition file
3. if the step file is quite short, check whether it uses a page object or shared helper

## Getting the repo running on Windows

You’ll need:

- Node.js 22
- Docker Desktop
- Git

Then from the repo root:

```bash
npm ci
npm --prefix e2e-tests ci
```

Create these env files:

- root `.env` from `.env.example`
- `packages/applications-service-api/.env` from `packages/applications-service-api/.env.development`

If you hit the Windows module resolution issue mentioned in the main repo README, run:

```bash
npm run win:common:fix
```

## Starting the app locally

From the repo root:

```bash
docker compose up -d mssql
npm run db:generate
npm run db:migrate:dev
npm run db:seed
npm run dev
```

The site should then be available at:

- `http://localhost:9004`

## Running the tests

Full regression:

```bash
npm --prefix e2e-tests run test:e2e
```

Smoke suite:

```bash
npm --prefix e2e-tests run test:e2e:smoke
```

Open Cypress interactively:

```bash
npm --prefix e2e-tests run test:open
```

If you’re just getting started, I’d use the smoke suite or Cypress open first rather than jumping straight into the full regression pack.

## A good way to learn the suite

I’d suggest starting with a few simpler tests before going near the longer registration journeys.

Good starter examples:

- [`cypress/e2e/homepage/locale-switcher.feature`](./cypress/e2e/homepage/locale-switcher.feature)
- [`cypress/e2e/projects/project-information/project-information.feature`](./cypress/e2e/projects/project-information/project-information.feature)
- [`cypress/e2e/projects/documents/documents-date-filter.feature`](./cypress/e2e/projects/documents/documents-date-filter.feature)

They’re a nice mix of:

- simple page behaviour
- project navigation
- slightly more realistic filtering behaviour

## A few practical tips

- Start with the feature file, not the JavaScript.
- Don’t assume the folder structure will always be tidy.
- If something looks shared, check the `common`, `projects/shared`, or `registration/shared` helpers.
- Read-only tests are usually easier to get comfortable with than registration tests.
- If a test passes locally but fails in CI, it’s often down to timing, seeded data, or environment differences rather than anything especially mysterious.

## Short version

If in doubt:

1. get the app running
2. open the feature file
3. trace it to the step definitions
4. run a small slice of tests
5. ask if something looks weird, because parts of the suite really have grown quite organically

That last bit is not you. It is the suite.
