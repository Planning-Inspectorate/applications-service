# NI Redirects

Handle redirects from the legacy NI site. This project is a [Cloudflare Worker](https://developers.cloudflare.com/workers/).

The pipeline step will generate the `config.generated.{env}.json` with `redirectAllowedCaseReferences` array using the feature flag 
from Azure `BACK_OFFICE_API_INTEGRATION_CASE_REFERENCES`.

## Setup

Use npm to install dependencies:

`npm ci`

## Deploy

Use wrangler to deploy:

`npm run deploy:test` for test

or

`npm run deploy:prod` for prod

> You'll need a Cloudflare account to deploy

## Configure

Edit `wrangler.toml` to configure the environment variables