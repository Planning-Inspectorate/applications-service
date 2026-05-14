const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	const caseReference = message.caseRef;
	const correlationId = message.correlationId;
	const representationId = message.representationId;

	if (!representationId) {
		context.log(`skipping nsip-representation-unpublish function as representationId is missing`, {
			correlationId,
			caseReference
		});
		return;
	}

	context.log(`invoking nsip-representation-unpublish function`, { correlationId, caseReference });

	// we use deleteMany to avoid the need to check if the document exists
	await prismaClient.representation.deleteMany({
		where: {
			representationId
		}
	});

	context.log(
		`nsip-representation-unpublish function unpublished representation with id: ${representationId}`,
		{
			correlationId,
			caseReference
		}
	);
};
