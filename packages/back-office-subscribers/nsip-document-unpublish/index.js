const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document-unpublish function`);
	const documentId = message.documentId;

	if (!documentId) {
		context.log(`skipping unpublish as documentId is missing`);
		return;
	}

	// we use deleteMany to avoid the need to check if the document exists
	await prismaClient.document.deleteMany({
		where: {
			documentId
		}
	});

	context.log(`unpublished document with documentId: ${documentId}`);
};
