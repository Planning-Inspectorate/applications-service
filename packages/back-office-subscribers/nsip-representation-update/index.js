const { prismaClient } = require('../lib/prisma');
const buildUpdateQuery = require('../lib/build-update-query');

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

	const { statement, parameters } = buildUpdateQuery(
		'representation',
		'representationId',
		representation,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`updated representation with representationId ${representationId}`);
};
