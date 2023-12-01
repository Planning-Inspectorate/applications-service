const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-unpublish function`);
	const caseReference = message.caseReference;

	if (!caseReference) {
		context.log(`skipping unpublish as caseReference is missing`);
		return;
	}

	// we use deleteMany to avoid the need to check if the project exists
	await prismaClient.project.deleteMany({
		where: {
			caseReference
		}
	});

	context.log(`unpublished project with caseReference: ${caseReference}`);
};
