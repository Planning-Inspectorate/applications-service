const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	const caseReference = message.caseRef;
	const correlationId = message.correlationId;
	const representationId = message.representationId;

	if (!representationId) {
		context.log(`skipping nsip-representation-unpublish function as representationId is missing`, {
			correlationId,
			caseReference
		});
		return;
	}

	context.log(`invoking nsip-representation-unpublish function`, { correlationId, caseReference });

	// we use deleteMany to avoid the need to check if the document exists
	await prismaClient.representation.deleteMany({
		where: {
			representationId
		}
	});

	context.log(
		`nsip-representation-unpublish function unpublished representation with id: ${representationId}`,
		{
			correlationId,
			caseReference
		}
	);

	if (!caseReference) {
		context.log('skipping cache clear as caseRef is required');
	} else {
		context.log(`clearing representations cache for caseRef ${caseReference}`);

		const cacheKeyPattern = `cache:${caseReference}:reps*`;
		const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

		const { data: cacheClearResponse } = await axios.delete(url);

		context.log(JSON.stringify(cacheClearResponse, null, 2));
		context.log(`representations cache cleared for caseRef ${caseReference}`);
	}
};
