const { isNullOrUndefined } = require('./_utils/is-null-undefined');
/**
 * Generic update query using Prisma's updateMany.
 *
 * @param {object}  repository  – Prisma repository, e.g. prismaClient.representation
 * @param {string}  keyColumn – The primary/unique key column name, e.g. 'representationId'
 * @param {object}  entity – The entity object including the key and fields to set
 * @param {string|Date} dateToCompare – The enqueued time used for the staleness guard
 * @returns {Promise<{count: number}>} The number of rows updated
 */
const buildPrismaUpdateQuery = async (repository, keyColumn, entity, dateToCompare) => {
	if (!repository || !keyColumn || !entity || !dateToCompare) {
		throw new Error('repository, keyColumn, entity and dateToCompare are required');
	}

	const keyValue = entity[keyColumn];

	if (isNullOrUndefined(keyValue)) {
		throw new Error(`Key column value for ${keyColumn} is required`);
	}

	//build the data payload using all fields except the key column
	//undefined values are converted to null so Prisma sets the DB column to NULL
	const data = {};
	for (const [col, value] of Object.entries(entity)) {
		//skip the key column
		if (col === keyColumn) {
			continue;
		}
		data[col] = isNullOrUndefined(value) ? null : value;
	}

	//only update if current record is older than the message + 1 minute
	const updateThreshold = new Date(new Date(dateToCompare).getTime() + 60000);

	return repository.updateMany({
		where: {
			[keyColumn]: keyValue,
			modifiedAt: {
				lte: updateThreshold
			}
		},
		data
	});
};

module.exports = buildPrismaUpdateQuery;
