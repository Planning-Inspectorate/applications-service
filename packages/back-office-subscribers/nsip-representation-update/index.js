const { prismaClient } = require('../lib/prisma');
const buildPrismaUpdateQuery = require('../lib/build-prisma-update-query');

module.exports = async (context, message) => {
	const { representationId, status, caseRef, correlationId } = message;

	if (!representationId) {
		throw new Error('representationId is required');
	} else if (!status) {
		throw new Error('status is required');
	}

	context.log(`invoking nsip-representation-update function`, {
		correlationId,
		caseReference: caseRef
	});

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
		context.log(`updated representation with representationId ${representationId}`, {
			correlationId,
			caseReference: caseRef
		});
	} else {
		context.log(
			`no representation updated with representationId ${representationId} - update may be stale or no record exists`,
			{
				correlationId,
				caseReference: caseRef
			}
		);
	}
};
