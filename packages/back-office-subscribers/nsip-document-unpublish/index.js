const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	const documentId = message.documentId;
	const caseRef = message.caseRef;

	if (!documentId) {
		context.warn(`skipping nsip-document-unpublish function as documentId is missing`, {
			correlationId: message.correlationId,
			caseReference: caseRef
		});
		return;
	}

	context.log(
		`invoking nsip-document-unpublish function for documentId ${documentId} and caseRef ${caseRef}`
	);

	// we use deleteMany to avoid the need to check if the document exists
	await prismaClient.document.deleteMany({
		where: {
			documentId
		}
	});
	context.log(`unpublished document for caseRef ${caseRef} with documentId: ${documentId}`);

	if (!caseRef) {
		context.log('skipping cache clear as caseRef is required');
	} else {
		context.log(`clearing documents cache for caseRef ${caseRef}...`);

		const cacheKeyPattern = `cache:${caseRef}:docs*`;
		const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

		const { data: cacheClearResponse } = await axios.delete(url);

		context.log(JSON.stringify(cacheClearResponse, null, 2));
		context.log(`documents cache cleared for caseRef ${caseRef}`);
	}
};
