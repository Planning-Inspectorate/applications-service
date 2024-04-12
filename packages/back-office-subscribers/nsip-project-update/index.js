const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-update function`);

	const projectUpdateId = message.id;

	if (!projectUpdateId) {
		throw new Error('id is required');
	}

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
};
