# Common

A package of common utilities that can be shared between all packages.

This should be required as a file dependency as will not be published to an
npm repository. To use it, add this line to your `package.json` `dependencies`
and run`npm install`.

```
"@pins/common": "file:../common",
```

## Modules

### Utils

#### Promise Timeout

Add a timeout to a promise

```typescript
interface promiseTimeout {
  (timeoutValueInMS: number, promise: Promise) : Promise
}
```
