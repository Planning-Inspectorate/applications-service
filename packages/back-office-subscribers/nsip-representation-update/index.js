const { prismaClient } = require('../lib/prisma');
const buildPrismaUpdateQuery = require('../lib/build-prisma-update-query');
const axios = require('axios');

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

	if (!caseRef) {
		context.log('skipping cache clear as caseRef is required');
	} else {
		context.log(`clearing representations cache for caseRef ${caseRef}`);
		//we clear whole reps cache for the case, rather that just a single entry, to ensure the change is reflected in the general reps cache where search results are stored
		const cacheKeyPattern = `cache:${caseRef}:reps*`;
		const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

		const { data: cacheClearResponse } = await axios.delete(url);

		context.log(JSON.stringify(cacheClearResponse, null, 2));
		context.log(`representations cache cleared for caseRef ${caseRef}`);
	}
};
