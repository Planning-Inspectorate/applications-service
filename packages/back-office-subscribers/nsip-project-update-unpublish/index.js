const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-update-unpublish function`);
	const { projectUpdateId, caseReference } = message;

	if (!projectUpdateId || !caseReference) {
		context.log(
			`aborting nsip-project-update-unpublish function as projectUpdateId or caseReference is missing`,
			{
				correlationId: message.correlationId
			}
		);
		throw new Error(`projectUpdateId or caseReference is missing`);
	}

	// we use deleteMany to avoid the need to check if the project update exists
	await prismaClient.projectUpdate.deleteMany({
		where: {
			projectUpdateId
		}
	});

	context.log(`unpublished project update with id: ${projectUpdateId}`);

	context.log(`clearing project updates cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:projectUpdates`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`project updates cache cleared for caseRef ${caseReference}`);
};
