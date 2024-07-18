const { createNotifyClient, notifyBuilder } = require('@planning-inspectorate/pins-notify');
const config = require('./config');
const logger = require('./logger');

const buildNotifyClient = () => {
	const notifyClient = createNotifyClient.createNotifyClient({
		baseUrl: config.services.notify.baseUrl,
		serviceId: config.services.notify.serviceId,
		apiKey: config.services.notify.apiKey
	});

	return notifyBuilder.reset().setNotifyClient(notifyClient);
};

const sendIPRegistrationConfirmationEmailToIP = async (details) => {
	try {
		const { email, projectName, projectNameWelsh, ipName, ipRef, projectEmail } = details;

		await buildNotifyClient()
			.setTemplateId(
				config.services.notify.templates.IPRegistrationConfirmationEmailToIP[
					projectNameWelsh ? 'cy' : 'en'
				]
			)
			.setDestinationEmailAddress(email)
			.setTemplateVariablesFromObject({
				'email address': email,
				project_name: projectName,
				interested_party_name: ipName,
				interested_party_ref: ipRef,
				having_your_say_url: config.services.notify.havingYourSayUrl,
				project_email: projectEmail,
				...(projectNameWelsh && { project_name_welsh: projectNameWelsh })
			})
			.setReference(ipRef)
			.sendEmail();
	} catch (e) {
		logger.error(
			{ err: e },
			'Unable to send IP registration confirmation email to interested party.'
		);
	}
};

const sendMagicLinkToIP = async (details) => {
	try {
		await buildNotifyClient()
			.setTemplateId(config.services.notify.templates.MagicLinkEmail)
			.setDestinationEmailAddress(details.email)
			.setTemplateVariablesFromObject({
				'email address': details.email,
				interested_party_name: details.ipName,
				ProjectName: details.projectName,
				DateOfRelevantRepresentationClose: `${details.repCloseDate} at 11:59pm GMT`,
				'magic link': `${config.services.notify.magicLinkDomain}/interested-party/confirm-your-email?token=${details.token}`,
				interested_party_number: details.ipRef
			})
			.setReference(details.ipRef)
			.sendEmail();
	} catch (e) {
		logger.error({ err: e }, 'Unable to send magic link email to interested party.');
	}
};

const sendSubmissionNotification = async (details) => {
	await buildNotifyClient()
		.setTemplateId(config.services.notify.templates.submissionCompleteEmail)
		.setDestinationEmailAddress(details.email)
		.setTemplateVariablesFromObject({
			'email address': details.email,
			submission_id: details.submissionId,
			project_name: details.project.name,
			project_email: details.project.email || 'NIEnquiries@planninginspectorate.gov.uk'
		})
		.setReference(`Submission ${details.submissionId}`)
		.sendEmail();
};

const sendSubscriptionCreateNotification = async (details) =>
	buildNotifyClient()
		.setTemplateId(config.services.notify.templates.subscriptionCreateEmail)
		.setDestinationEmailAddress(details.email)
		.setTemplateVariablesFromObject({
			subscription_url: config.services.notify.subscriptionCreateDomain.concat(
				'/projects/',
				details.project.caseReference,
				'/get-updates/subscribed?subscriptionDetails=',
				details.subscriptionDetails
			),
			project_name: details.project.name,
			project_email: details.project.email
		})
		.setReference(`Subscription ${details.project.caseReference} ${details.email}`)
		.sendEmail();

module.exports = {
	sendIPRegistrationConfirmationEmailToIP,
	sendMagicLinkToIP,
	sendSubmissionNotification,
	sendSubscriptionCreateNotification
};
