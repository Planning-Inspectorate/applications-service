const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation-update function`);
	const { representationId, status } = message;

	if (!representationId) {
		throw new Error('representationId is required');
	} else if (!status) {
		throw new Error('status is required');
	}

	console.log('context.bindingData.enqueuedTimeUtc', context.bindingData.enqueuedTimeUtc);

	const representation = {
		representationId,
		status,
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'representation',
		'representationId',
		representation,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`upserted representation with representationId ${representationId}`);
};
