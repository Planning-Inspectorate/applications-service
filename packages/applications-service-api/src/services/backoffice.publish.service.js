const config = require('../lib/config');
const { sendMessages } = require('../lib/eventClient');

const publishNSIPSubscription = async (caseReference, email, subscriptionTypes) => {
	const body = {
		nsipSubscription: {
			caseReference: caseReference,
			emailAddress: email,
			startDate: new Date(Date.now())
		},
		subscriptionTypes: subscriptionTypes
	};

	await sendMessages(config.backOfficeIntegration.serviceBus.topics.REGISTER_NSIP_SUBSCRIPTION, [
		{
			body,
			contentType: 'application/json',
			applicationProperties: {
				version: '0.1',
				type: 'Create'
			}
		}
	]);
};

module.exports = { publishNSIPSubscription };
