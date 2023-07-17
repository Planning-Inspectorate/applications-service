const config = require('../lib/config');
const { sendMessages } = require('../lib/eventClient');

const publishCreateNSIPSubscription = async (caseReference, email, subscriptionTypes) => {
	const message = {
		body: {
			nsipSubscription: {
				caseReference: caseReference,
				emailAddress: email,
				startDate: new Date(Date.now())
			},
			subscriptionTypes: subscriptionTypes
		},
		contentType: 'application/json',
		applicationProperties: {
			version: '0.1',
			type: 'Create'
		}
	};

	await sendMessages(config.backOfficeIntegration.serviceBus.topics.REGISTER_NSIP_SUBSCRIPTION, [
		message
	]);
};

const publishDeleteNSIPSubscription = async (caseReference, email) => {
	const message = {
		body: {
			nsipSubscription: {
				caseReference: caseReference,
				emailAddress: email
			}
		},
		contentType: 'application/json',
		applicationProperties: {
			version: '0.1',
			type: 'Delete'
		}
	};

	await sendMessages(config.backOfficeIntegration.serviceBus.topics.REGISTER_NSIP_SUBSCRIPTION, [
		message
	]);
};

module.exports = { publishCreateNSIPSubscription, publishDeleteNSIPSubscription };
