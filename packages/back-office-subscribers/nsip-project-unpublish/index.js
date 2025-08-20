const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-unpublish function`);
	const caseReference = message.caseReference;

	if (!caseReference) {
		context.log(`skipping unpublish as caseReference is missing`);
		return;
	}

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
	context.log(`unpublished project with caseReference: ${caseReference}`);
};
