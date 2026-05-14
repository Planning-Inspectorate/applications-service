const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

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
};
