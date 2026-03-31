const { prismaClient } = require('../lib/prisma');
const buildPrismaUpdateQuery = require('../lib/build-prisma-update-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation-update function`);
	const { representationId, status } = message;

	if (!representationId) {
		throw new Error('representationId is required');
	} else if (!status) {
		throw new Error('status is required');
	}

	const representation = {
		representationId,
		status,
		modifiedAt: new Date()
	};

	const updateResult = await buildPrismaUpdateQuery(
		prismaClient.representation,
		'representationId',
		representation,
		context.bindingData.enqueuedTimeUtc
	);

	if (updateResult?.count > 0) {
		context.log(`updated representation with representationId ${representationId}`);
	} else {
		context.log(
			`no representation updated with representationId ${representationId} - update may be stale or no record exists`
		);
	}
};
