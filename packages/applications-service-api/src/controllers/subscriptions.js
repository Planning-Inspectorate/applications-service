const { encrypt, decrypt } = require('../lib/crypto');
const { sendSubscriptionCreateNotification } = require('../lib/notify');
const { getApplication } = require('../services/application.v2.service');
const ApiError = require('../error/apiError');
const moment = require('moment');
const { publishNSIPSubscription } = require('../services/backoffice.publish.service');

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

	const project = await getApplication(caseReference);
	if (!project) throw ApiError.notFound(`Project with case reference ${caseReference} not found`);

	const { email, subscriptionTypes, date } = JSON.parse(decrypt(encryptedSubscriptionDetails));

	validateSubscriptionDate(date);

	await publishNSIPSubscription(caseReference, email, subscriptionTypes);

	res.status(200).send();
};

const validateSubscriptionDate = (subscriptionCreatedAt) => {
	const expiryTime = moment(subscriptionCreatedAt).add(48, 'hours');
	if (moment().isAfter(expiryTime)) throw ApiError.badRequest('Subscription details have expired');
};

module.exports = { createSubscription, confirmSubscription };
