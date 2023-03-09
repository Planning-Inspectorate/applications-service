# Back Office Service

Service for accessing data stored in the Applications database, that has been consumed from [Back Office](https://github.com/Planning-Inspectorate/back-office)

## Database

#### Running locally

Data is stored in SQL Server ([Azure SQL](https://learn.microsoft.com/en-us/azure/azure-sql/database/local-dev-experience-sql-database-emulator?view=azuresql)), which can be run locally with Docker: 

```
docker compose up mssql
``` 

To run the `mssql` container alongside the rest of the application run:

```
docker compose --profile next up
```

#### Direct database access

To access the database directly via CLI, you can run:

```
docker exec -it mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P <PASSWORD> -d pins_applications_development
```

or you can use a GUI of your choice, using the credentials in `.env.development`.

## Initial setup

1. create a copy of the `.env.development` file and name it `.env`
2. run the `mssql` container as described above
3. run `npx prisma migrate dev --name init` to initialise the database in your local environment
