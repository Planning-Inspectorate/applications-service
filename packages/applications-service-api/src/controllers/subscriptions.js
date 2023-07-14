const { encrypt } = require('../lib/crypto');
const { sendSubscriptionCreateNotification } = require('../lib/notify');
const { getApplication } = require('../services/application.v2.service');
const ApiError = require('../error/apiError');

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

module.exports = { createSubscription };
