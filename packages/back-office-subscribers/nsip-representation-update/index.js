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

	await buildPrismaUpdateQuery(
		prismaClient.representation,
		'representationId',
		representation,
		context.bindingData.enqueuedTimeUtc
	);

	context.log(`updated representation with representationId ${representationId}`);
};
