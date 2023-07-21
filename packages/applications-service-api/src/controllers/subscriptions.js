const { encrypt, decrypt } = require('../lib/crypto');
const { sendSubscriptionCreateNotification } = require('../lib/notify');
const { getApplication } = require('../services/application.v2.service');
const ApiError = require('../error/apiError');
const moment = require('moment');
const {
	publishCreateNSIPSubscription,
	publishDeleteNSIPSubscription
} = require('../services/backoffice.publish.service');
const logger = require('../lib/logger');

const createSubscription = async (req, res) => {
	const { email, subscriptionTypes } = req.body;
	const { caseReference } = req.params;

	const project = await getApplication(caseReference);
	if (!project) throw ApiError.notFound(`Project with case reference ${caseReference} not found`);

	const subscriptionDetails = encrypt(
		JSON.stringify({
			email: email,
			subscriptionTypes: subscriptionTypes,
			date: new Date(Date.now())
		})
	);

	await sendSubscriptionCreateNotification({
		email: email,
		subscriptionDetails: subscriptionDetails,
		project: {
			email: project.projectEmailAddress,
			name: project.projectName,
			caseReference: project.caseReference
		}
	});

	res.send({
		subscriptionDetails: subscriptionDetails
	});
};

const confirmSubscription = async (req, res) => {
	const encryptedSubscriptionDetails = req.body.subscriptionDetails;
	const { caseReference } = req.params;

	await validateCaseReference(caseReference);

	const { email, subscriptionTypes, date } = decryptSubscriptionDetails(
		encryptedSubscriptionDetails
	);

	validateSubscriptionDate(date);

	await publishCreateNSIPSubscription(caseReference, email, subscriptionTypes);

	res.status(204).send();
};

const deleteSubscription = async (req, res) => {
	const { caseReference } = req.params;
	const { email } = req.query;

	await validateCaseReference(caseReference);

	const decryptedEmail = decrypt(email);

	await publishDeleteNSIPSubscription(caseReference, decryptedEmail);

	res.status(204).send();
};

const validateCaseReference = async (caseReference) => {
	const project = await getApplication(caseReference);
	if (!project) throw ApiError.notFound(`Project with case reference ${caseReference} not found`);
};

const validateSubscriptionDate = (subscriptionCreatedAt) => {
	const expiryTime = moment(subscriptionCreatedAt).add(48, 'hours');
	if (moment().isAfter(expiryTime)) throw ApiError.badRequest('Subscription details have expired');
};

const decryptSubscriptionDetails = (encryptedSubscriptionDetails) => {
	let subscriptionDetails;

	try {
		subscriptionDetails = JSON.parse(decrypt(encryptedSubscriptionDetails));
	} catch (e) {
		logger.error(e);
		throw ApiError.internalServerError('Failed to decrypt subscriptionDetails');
	}

	if (!subscriptionDetails.email)
		throw ApiError.internalServerError(
			'encrypted subscriptionDetails must contain `email` property'
		);
	if (!subscriptionDetails.subscriptionTypes)
		throw ApiError.internalServerError(
			'encrypted subscriptionDetails must contain `subscriptionTypes` property'
		);

	return subscriptionDetails;
};

module.exports = { createSubscription, confirmSubscription, deleteSubscription };
