const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	const adviceId = message.adviceId;
	const caseReference = message.caseReference;

	if (!adviceId) {
		context.log(`skipping nsip-advice-unpublish function as adviceId is missing`, {
			correlationId: message.correlationId
		});
		return;
	}

	context.log(
		`invoking nsip-advice-unpublish function for caseReference: ${caseReference} adviceId ${adviceId}`
	);

	// we use deleteMany to avoid the need to check if the advice exists
	await prismaClient.advice.deleteMany({
		where: {
			adviceId
		}
	});

	context.log(
		`nsip-advice-unpublish function published advice for caseReference ${caseReference} with adviceId: ${adviceId}`
	);
};
