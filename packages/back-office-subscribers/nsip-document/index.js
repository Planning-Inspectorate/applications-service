const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document function`);
	const documentId = message.documentId;

	if (!documentId) {
		throw new Error('documentId is required');
	}

	const documents = {
		...pick(message, documentPropertiesFromMessage),
		stage: message.documentCaseStage,
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'document',
		'documentId',
		documents,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`upserted document with documentId ${documentId}`);
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
	'filter1',
	'filter2'
];
