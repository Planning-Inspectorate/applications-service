const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation-unpublish function`);
	const representationId = message.representationId;

	if (!representationId) {
		context.log(`skipping unpublish as representationId is missing`);
		return;
	}

	// we use deleteMany to avoid the need to check if the document exists
	await prismaClient.representation.deleteMany({
		where: {
			representationId
		}
	});

	context.log(`unpublished representation with id: ${representationId}`);
};
