const { isNullOrUndefined } = require('./_utils/is-null-undefined');

/**
 * Build an update query for the given entity
 * This query will only update the row if it already exists in the table
 * If the row does not exist, nothing happens
 *
 * @param tableName
 * @param keyColumn
 * @param entity
 * @param dateToCompare
 * @returns {{statement: string, parameters: unknown[]}}
 */
const buildUpdateQuery = (tableName, keyColumn, entity, dateToCompare) => {
	if (!tableName || !keyColumn || !entity || !dateToCompare) {
		throw new Error('tableName, keyColumn, entity and dateToCompare are required');
	}
	dateToCompare = new Date(dateToCompare).toISOString().slice(0, 19).replace('T', ' ');

	let paramNo = 1;
	const setClauseItems = [];
	const parameters = [];

	//build the SET clause and parameters array, skipping the key column
	Object.keys(entity)
		.filter((col) => col !== keyColumn)
		.forEach((col) => {
			const value = entity[col];

			if (isNullOrUndefined(value)) {
				//dont assign numbered parameter to null and set the value directly
				setClauseItems.push(`[${col}] = NULL`);
			} else {
				parameters.push(value);
				setClauseItems.push(`[${col}] = @P${paramNo++}`);
			}
		});

	//assign the final parameter for keyColumn to be used in the WHERE clause
	const keyValue = entity[keyColumn];

	if (isNullOrUndefined(keyValue)) {
		throw new Error(`Key column value for ${keyColumn} is required`);
	}

	parameters.push(keyValue);
	const keyParam = `@P${paramNo++}`;

	const setClause = setClauseItems.join(', ');

	const statement = `UPDATE [${tableName}]
			SET ${setClause}
			WHERE [${keyColumn}] = ${keyParam}
			AND '${dateToCompare}' >= DATEADD(MINUTE, -1, [modifiedAt]);`;

	return { statement, parameters };
};

module.exports = buildUpdateQuery;
