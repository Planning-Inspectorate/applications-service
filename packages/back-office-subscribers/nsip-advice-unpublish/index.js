const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	const adviceId = message.adviceId;
	const caseReference = message.caseReference;

	if (!adviceId) {
		context.log(`skipping nsip-advice-unpublish function as adviceId is missing`, {
			correlationId: message.correlationId
		});
		return;
	}

	context.log(
		`invoking nsip-advice-unpublish function for caseReference: ${caseReference} adviceId ${adviceId}`
	);

	// we use deleteMany to avoid the need to check if the advice exists
	await prismaClient.advice.deleteMany({
		where: {
			adviceId
		}
	});

	context.log(
		`nsip-advice-unpublish function published advice for caseReference ${caseReference} with adviceId: ${adviceId}`
	);
	context.log(`clearing advice cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:advice:*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`advice cache cleared for caseRef ${caseReference}`);
};
