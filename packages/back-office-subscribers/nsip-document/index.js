const axios = require('axios');
const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-document function`);
	const documentId = message.documentId;
	const caseRef = message.caseRef;

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

	if (!caseRef) {
		context.log('skipping cache clear as caseRef is required');
	} else {
		context.log(`clearing documents cache for caseRef ${caseRef}`);

		const cacheKeyPattern = `cache:${caseRef}:docs*`;
		const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

		const { data: cacheClearResponse } = await axios.delete(url);

		context.log(JSON.stringify(cacheClearResponse, null, 2));
	}
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
