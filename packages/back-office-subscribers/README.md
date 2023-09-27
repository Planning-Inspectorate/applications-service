## back-office-subscribers

Azure Function App containing various "serverless" functions to consume messages published to the Back Office message queue (Service Bus). Each function is named after the topic it subscribes to.

### Local development

Pre-requisites:

- Ensure the `pins_applications_development` Azure SQL server is running locally. Use `npm run dev` or `docker compose up` from within [./packages/applications-service-api](./packages/applications-service-api) to start the API stack, which includes the SQL database, or run the `mssql` container individually. 

- Create a file called `local.settings.json` within the [./packages/back-office-subscribers](./packages/back-office-subscribers) directory like this:

```
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SqlConnectionString": "Server=tcp:localhost,1433;Initial Catalog=pins_applications_development;User ID=<local-db-user>;Password=<local-db-pass>;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_EXTENSION_VERSION": "~4",
    "WEBSITE_NODE_DEFAULT_VERSION": "16",
    "ServiceBusConnection": "Endpoint=sb://pins-sb-back-office-dev-ukw-001.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<access-key-goes-here>",
    "ServiceBusConnection__fullyQualifiedNamespace": "pins-sb-back-office-dev-ukw-001.servicebus.windows.net",
    "APPLICATIONS_SERVICE_API_URL": "http://localhost:3000"
  },
  "ConnectionStrings": {}
}
```

Note the `local.settings.json` example above contains placeholder values. You should replace them with real ones. The database credentials in `SqlConnectionString` are those for your local Azure SQL database. You can find those in [./packages/applications-service-api/.env](./packages/applications-service-api/.env). The `ServiceBusConnection` key will need to retrieved from into Azure Portal (`Service Bus` > `pins-sb-back-office-dev-ukw-001` > `Shared Access Policies`).

then, from within the [./packages/back-office-subscribers](./packages/back-office-subscribers) directory:

- Install local dev dependencies: `npm i`
- Run Azurite in the background: `npx azurite`
- Run a function: `npx func start --functions <function-name>`

If the function is triggered by a Service Bus event (see its `function.json` and look at the input binding), then you can invoke the function manually with a HTTP request like so:

```
curl --location 'http://localhost:7071/admin/functions/<function-name>' \
	--header 'Content-Type: application/json' \
	--data '{
		"input": "{\"yourJsonPayload\":"goesHere\""}
	}'
```

Note that the value of `input` in the JSON payload is stringified and escaped.

Alternatively, if you have the `ServiceBusConnection` property in [local.settings.json](local.settings.json) set to a valid connection string for the dev Service Bus instance, then whilst you are running the function locally, it will receive messages from the topic subscription. Setting this up is not mandatory, and triggering the function via the HTTP request mentioned above is enough but the function will continuously try and connect to Service Bus which can generate lots of error logs.
