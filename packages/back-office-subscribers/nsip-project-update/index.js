const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');
const axios = require('axios');

module.exports = async (context, message) => {
	const projectUpdateId = message.id;
	const caseReference = message.caseReference;

	if (!projectUpdateId) {
		throw new Error(`id is required for nsip-project-update function`, {
			correlationId: message.correlationId
		});
	}

	context.log(`invoking nsip-project-update function for caseReference: ${caseReference}`);

	const projectUpdate = {
		projectUpdateId,
		caseReference: message.caseReference,
		updateDate: message.updateDate,
		updateName: message.updateName,
		updateContentEnglish: message.updateContentEnglish,
		updateContentWelsh: message.updateContentWelsh,
		updateStatus: message.updateStatus,
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'projectUpdate',
		'projectUpdateId',
		projectUpdate,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`upserted projectUpdate with projectUpdateId ${projectUpdateId}`);
	context.log(`clearing project updates cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:projectUpdates`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`project updates cache cleared for caseRef ${caseReference}`);
};
