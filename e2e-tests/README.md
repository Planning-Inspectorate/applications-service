# Cypress E2E tests

### Overview

The [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) framework provides support 
for automated testing and BDD. 

#### Running against a different base URL

By default, Cypress will run tests against the URL defines in the `baseUrl` setting in `cypress.json` (currently,
[localhost:9004](http://localhost:9004)). If you wish to switch to a different URL, you can set an environment
variable to do so. For example, to run against the prod cluster.

```shell
CYPRESS_BASE_URL=http://application-planning-decision.planninginspectorate.gov.uk npm run test:e2e
```

If you wish to test against a different cluster secured with HTTP Basic authentication, you add this into the
environment variable. For instance, if the username was `hello` and the password `world`:

```shell
CYPRESS_BASE_URL=http://hello:world@applications-dev.planninginspectorate.gov.uk npm run test:e2e
```

> This is not the password. For (obvious) security purposes, this is never checked into this repo.

If you wish to run this inside GitHub Actions against an environment, a secret is configured with all URLs (and
any authentication):
 - `CYPRESS_DEV_BASE_URL`
 - `CYPRESS_PREPROD_BASE_URL`
 - `CYPRESS_PROD_BASE_URL`



#### Test data


From the `e2e-tests` folder, the tests can be run locally setting the delay period with commands below

to run all the tests in headed mode using `@testSuite` tag:
```
node_modules/cypress/bin/cypress run --headed -b chrome --env demoDelay=1000 -e TAGS="@testSuite"
```
selection of tests by tags i.e. only those with `@wip` tag:
```
node_modules/cypress/bin/cypress run --headed -b chrome --env demoDelay=1000 -e TAGS="@wip"
```
A much more efficient way of running a selection of tests by tag which avoids firing up a browser for skipped feature files:
```
node_modules/.bin/cypress-tags run --headed -b chrome --env demoDelay=1000 -e TAGS="@registration and @myself"
```
or like this to select a specific feature file:
```
node_modules/cypress/bin/cypress run --headed -b chrome --env demoDelay=1000 --spec cypress/integration/register-type-of-party.feature
```
or like this to run all feature files in a specific directory:
```
node_modules/cypress/bin/cypress run --headed -b chrome --env demoDelay=1000 --spec "cypress/integration/registration/myself/**/*.feature"
```

accessibility testing is integrated along with the acceptance tests. It has been commented out atm until the accessibility issues were resolved. To run accessibility testing uncomment below code from assertUserOnThePage.js file. For every page we assert title and heading and along with that axe will be run against that page to find out accessibility violations:
```
 cy.checkPageA11y({
    });
```