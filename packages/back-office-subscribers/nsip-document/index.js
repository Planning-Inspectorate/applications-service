const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document function`);
	const documentId = message.documentId;

	if (!documentId) {
		context.log(`skipping update as documentId is missing`);
		return;
	}

	return await prismaClient.$transaction(async (tx) => {
		const existingDocument = await tx.document.findUnique({
			where: {
				documentId
			}
		});

		const shouldUpdate =
			!existingDocument ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingDocument.modifiedAt.toUTCString());

		if (shouldUpdate) {
			const document = {
				...pick(message, documentPropertiesFromMessage),
				modifiedAt: new Date()
			};
			await tx.document.upsert({
				where: {
					documentId
				},
				update: document,
				create: document
			});
			context.log(`upserted document with documentId: ${documentId}`);
		} else {
			context.log(`skipping update of document with documentId: ${documentId}`);
		}
	});
};

const documentPropertiesFromMessage = [
	'documentId',
	'caseId',
	'caseRef',
	'documentReference',
	'version',
	'examinationRefNo',
	'filename',
	'originalFilename',
	'size',
	'mime',
	'documentURI',
	'publishedDocumentURI',
	'virusCheckStatus',
	'fileMD5',
	'dateCreated',
	'lastModified',
	'caseType',
	'documentStatus',
	'redactedStatus',
	'publishedStatus',
	'datePublished',
	'documentType',
	'securityClassification',
	'sourceSystem',
	'origin',
	'owner',
	'author',
	'representative',
	'description',
	'stage',
	'filter1',
	'filter2'
];
