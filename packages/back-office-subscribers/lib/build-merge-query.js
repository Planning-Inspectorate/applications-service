const isNullOrUndefined = (value) => value === null || value === undefined;

/**
 * Build a merge query for the given entity
 * This query is atomic and runs with Prisma.$executeRawUnsafe
 * It's required as multiple messages for related entities can be received at the same time
 * And we need to ensure the entities are compared and created / updated atomically
 * @param tableName
 * @param keyColumn
 * @param entity
 * @param dateToCompare
 * @returns {{statement: string, parameters: unknown[]}}
 */
const buildMergeQuery = (tableName, keyColumn, entity, dateToCompare) => {
	if (!dateToCompare) {
		throw new Error('dateToCompare is required');
	}
	dateToCompare = new Date(dateToCompare).toISOString().slice(0, 19).replace('T', ' ');
	const columns = Object.keys(entity)
		.map((col) => `[${col}]`)
		.join(', ');
	let paramNo = 1;
	const parameters = Object.values(entity).filter((value) => !isNullOrUndefined(value));
	const parameterNames = Object.values(entity)
		.map((value) => (isNullOrUndefined(value) ? 'NULL' : `@P${paramNo++}`))
		.join(', ');

	const updateColumns = Object.keys(entity)
		.filter((col) => col !== keyColumn)
		.map((col) => `Target.[${col}] = Source.[${col}]`)
		.join(', ');

	const statement = `MERGE INTO [${tableName}] AS Target
			USING (SELECT ${parameterNames}) AS Source (${columns})
			ON Target.[${keyColumn}] = Source.[${keyColumn}]
			WHEN MATCHED 
			AND '${dateToCompare}' >= DATEADD(MINUTE, -1, Target.[modifiedAt])
			THEN UPDATE SET ${updateColumns}
			WHEN NOT MATCHED THEN INSERT (${columns}) VALUES (${parameterNames});`;

	return { statement, parameters };
};

module.exports = buildMergeQuery;
