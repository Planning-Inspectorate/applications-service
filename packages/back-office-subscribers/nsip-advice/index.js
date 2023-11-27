const pick = require('lodash.pick');
const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-advice function`);
	const adviceId = message.adviceId;

	if (!adviceId) {
		context.log(`skipping update as adviceId is missing`);
		return;
	}

	return await prismaClient.$transaction(async (tx) => {
		const existingAdvice = await tx.advice.findUnique({
			where: {
				adviceId
			}
		});

		const shouldUpdate =
			!existingAdvice ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingAdvice.modifiedAt.toUTCString());

		if (shouldUpdate) {
			let advice = pick(message, advicePropertiesFromMessage);
			advice = {
				...advice,
				attachmentIds: advice?.attachmentIds.join(','),
				modifiedAt: new Date()
			};
			await tx.advice.upsert({
				where: {
					adviceId
				},
				update: advice,
				create: advice
			});
			context.log(`upserted advice with adviceId: ${adviceId}`);
		} else {
			context.log(`skipping update of advice with adviceId: ${adviceId}`);
		}
	});
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
