const axios = require('axios');
const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document function`);
	const documentId = message.documentId;
	const caseRef = message.caseReference;

	if (!documentId) {
		throw new Error('documentId is required');
	}

	if (!caseRef) {
		throw new Error('caseReference is required');
	}

	context.log(`clearing documents cache for caseRef ${caseRef}`);

	const cacheKeyPattern = `cache:${caseRef}:docs*`
	const cacheClearResponse = await axios.delete(`${process.env.APPLICATIONS_WEB_BASE_URL}/api/cache/clear?${cacheKeyPattern}`)

	context.log(`cleared ${cacheClearResponse} keys for pattern ${cacheKeyPattern}`);

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
	'authorWelsh',
	'representative',
	'description',
	'descriptionWelsh',
	'filter1',
	'filter1Welsh',
	'filter2'
];
