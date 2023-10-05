const config = require('../lib/config');

const { sendMessages } = require('../lib/eventClient');
const { getDate } = require('../utils/date-utils');

const { DEADLINE_SUBMISSION, REGISTER_NSIP_SUBSCRIPTION } =
	config.backOfficeIntegration.serviceBus.topics;

const publishDeadlineSubmission = async (submission, fileBlobGuid) => {
	const { metadata, file } = submission;
	const message = {
		body: {
			caseReference: metadata.caseReference,
			name: metadata.name,
			email: metadata.email,
			interestedParty: metadata.interestedParty,
			interestedPartyReference: metadata.ipReference,
			deadline: metadata.deadline,
			submissionType: metadata.submissionType,
			sensitiveData: metadata.sensitiveData,
			lateSubmission: metadata.lateSubmission,
			submissionId: metadata.submissionId,
			blobGuid: fileBlobGuid,
			documentName: file?.originalName
		},
		contentType: 'application/json',
		applicationProperties: {}
	};

	await sendMessages(DEADLINE_SUBMISSION, [message]);
};

const publishCreateNSIPSubscription = async (caseReference, email, subscriptionTypes) => {
	const message = {
		body: {
			nsipSubscription: {
				caseReference: caseReference,
				emailAddress: email,
				startDate: getDate()
			},
			subscriptionTypes: subscriptionTypes
		},
		contentType: 'application/json',
		applicationProperties: {
			version: '0.1',
			type: 'Create'
		}
	};

	await sendMessages(REGISTER_NSIP_SUBSCRIPTION, [message]);
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

	await sendMessages(REGISTER_NSIP_SUBSCRIPTION, [message]);
};

module.exports = {
	publishCreateNSIPSubscription,
	publishDeleteNSIPSubscription,
	publishDeadlineSubmission
};
