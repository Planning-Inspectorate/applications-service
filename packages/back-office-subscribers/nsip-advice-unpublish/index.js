const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-advice-unpublish function`);
	const adviceId = message.adviceId;

	if (!adviceId) {
		context.log(`skipping unpublish as adviceId is missing`);
		return;
	}

	// we use deleteMany to avoid the need to check if the advice exists
	await prismaClient.advice.deleteMany({
		where: {
			adviceId
		}
	});

	context.log(`unpublished advice with adviceId: ${adviceId}`);
};
