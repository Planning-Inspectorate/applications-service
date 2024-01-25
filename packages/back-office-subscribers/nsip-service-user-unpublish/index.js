const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-service-user-unpublish function`);
	const serviceUserId = message.id;

	if (!serviceUserId) {
		context.log(`skipping unpublish as serviceUserId is missing`);
		return;
	}

	// we only need to disconnect the service user from the project table
	// representation contact service users will never be unpublished
	await prismaClient.project.updateMany({
		where: {
			applicantId: serviceUserId
		},
		data: {
			applicantId: null
		}
	});

	// we use deleteMany to avoid checking if the service user exists (idempotent operation)
	await prismaClient.serviceUser.deleteMany({
		where: {
			serviceUserId
		}
	});

	context.log(`unpublished service user with serviceUserId ${serviceUserId}`);
};
