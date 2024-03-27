const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-advice function`);
	const adviceId = message.adviceId;

	if (!adviceId) {
		throw new Error('adviceId is required');
	}
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
	context.log(`upserted advice with adviceId ${adviceId}`);
};
const advicePropertiesFromMessage = [
	'adviceId',
	'adviceReference',
	'caseReference',
	'caseId',
	'title',
	'from',
	'agent',
	'method',
	'enquiryDate',
	'enquiryDetails',
	'adviceGivenBy',
	'adviceDate',
	'adviceDetails',
	'status',
	'redactionStatus',
	'attachmentIds'
];
