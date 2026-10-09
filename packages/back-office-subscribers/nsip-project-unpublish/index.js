const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');
const axios = require('axios');

module.exports = async (context, message) => {
	const caseReference = message.caseReference;

	if (!caseReference) {
		context.log(`skipping nsip-project-unpublish function as caseReference is missing`, {
			correlationId: message.correlationId
		});
		return;
	}

	context.log(`invoking nsip-project-unpublish function for caseReference: ${caseReference}`);

	const project = {
		caseReference,
		publishStatus: 'unpublished',
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'project',
		'caseReference',
		project,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(
		`nsip-project-unpublish function unpublished project with caseReference: ${caseReference}`
	);
	context.log(`clearing project data cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:projectData:*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`project data cache cleared for caseRef ${caseReference}`);
};
