const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	const serviceUserId = message.id;
	const caseReference = message.caseReference;

	if (!serviceUserId) {
		context.log(`skipping nsip-service-user-unpublish function as serviceUserId is missing`, {
			correlationId: message.correlationId,
			caseReference
		});
		return;
	}

	context.log(`invoking nsip-service-user-unpublish function for caseReference: ${caseReference}`);

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

	context.log(
		`nsip-service-user-unpublish function unpublished service user with serviceUserId ${serviceUserId} for caseReference: ${caseReference}`
	);
};
