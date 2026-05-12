# Cypress E2E compatibility shim

`packages/e2e_tests` has been merged into the root [`e2e-tests`](../../e2e-tests/README.md) suite.

Use the root suite directly for day-to-day work:

```sh
npm --prefix e2e-tests run test:e2e
```

The `package.json` in this folder is kept only as a compatibility shim for older local commands.
