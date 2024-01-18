const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation-update function`);
	const { representationId, status } = message;

	if (!representationId) {
		context.log(`skipping update as representationId is missing`);
		return;
	} else if (!status) {
		context.log(`skipping update as status is missing`);
		return;
	}

	await prismaClient.representation.update({
		where: { representationId },
		data: { status }
	});
	context.log(`updated representation ${representationId} to ${status}`);
};
