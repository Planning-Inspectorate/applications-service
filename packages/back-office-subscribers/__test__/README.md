## Back Office Subscriber Functions Integration Tests

This directory contains integration tests for the back office subscriber functions. It is intended to be run
locally and not as part of the CI/CD pipeline as it requires a local instance of the database to be running. It also clears the database as part of the tests. 

### Running the tests
```bash
npm run test:integration
```