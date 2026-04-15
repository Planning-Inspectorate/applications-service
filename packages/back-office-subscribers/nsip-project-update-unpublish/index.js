const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-update-unpublish function`);
	const projectUpdateId = message.id;

	if (!projectUpdateId) {
		context.log(`skipping nsip-project-update-unpublish function as projectUpdateId is missing`, {
			correlationId: message.correlationId
		});
		return;
	}

	// we use deleteMany to avoid the need to check if the project update exists
	await prismaClient.projectUpdate.deleteMany({
		where: {
			projectUpdateId
		}
	});

	context.log(`unpublished project update with id: ${projectUpdateId}`);
};
