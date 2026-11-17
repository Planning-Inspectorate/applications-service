const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');
const axios = require('axios');

module.exports = async (context, message) => {
	const adviceId = message.adviceId;
	const caseReference = message.caseReference;

	if (!adviceId) {
		throw new Error(`adviceId is required for nsip-advice function`, {
			correlationId: message.correlationId
		});
	}

	context.log(
		`invoking nsip-advice function for caseReference ${caseReference} and adviceId ${adviceId}`
	);

	const advice = {
		...pick(message, advicePropertiesFromMessage),
		attachmentIds: message.attachmentIds?.join(','),
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'advice',
		'adviceId',
		advice,
		context.bindingData.enqueuedTimeUtc
	);

	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(
		`nsip-advice function upserted advice with adviceId ${adviceId} for caseReference ${caseReference}`
	);
	context.log(`clearing advice cache for caseRef ${caseReference}...`);

	const cacheKeyPattern = `cache:${caseReference}:advice:*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`advice cache cleared for caseRef ${caseReference}`);
};

const advicePropertiesFromMessage = [
	'adviceId',
	'adviceReference',
	'caseReference',
	'caseId',
	'title',
	'titleWelsh',
	'from',
	'agent',
	'method',
	'enquiryDate',
	'enquiryDetails',
	'enquiryDetailsWelsh',
	'adviceGivenBy',
	'adviceDate',
	'adviceDetails',
	'adviceDetailsWelsh',
	'status',
	'redactionStatus',
	'attachmentIds'
];
