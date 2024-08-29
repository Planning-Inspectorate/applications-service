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
				project_email: projectEmail || 'NIEnquiries@planninginspectorate.gov.uk',
				...(projectNameWelsh && { project_name_welsh: projectNameWelsh })
			})
			.setReference(ipRef)
			.sendEmail();
	} catch (e) {
		logger.error(
			{ err: e },
			`Notify service unable to send IP registration confirmation email to interested party ref ${details.ipRef}.`
		);
	}
};

const sendSubmissionNotification = async (details) => {
	try {
		await buildNotifyClient()
			.setTemplateId(
				config.services.notify.templates.submissionCompleteEmail[
					details.project.welshName ? 'cy' : 'en'
				]
			)
			.setDestinationEmailAddress(details.email)
			.setTemplateVariablesFromObject({
				'email address': details.email,
				submission_id: details.submissionId,
				project_name: details.project.name,
				project_email: details.project.email || 'NIEnquiries@planninginspectorate.gov.uk',
				...(details.project.welshName && { project_name_welsh: details.project.welshName })
			})
			.setReference(`Submission ${details.submissionId}`)
			.sendEmail();
	} catch (e) {
		logger.error(
			{ err: e },
			`Notify service unable to send submission notification email for submission ID ${details.submissionId}`
		);
	}
};

const sendSubscriptionCreateNotification = async (details) => {
	try {
		await buildNotifyClient()
			.setTemplateId(
				config.services.notify.templates.subscriptionCreateEmail[
					details.project.welshName ? 'cy' : 'en'
				]
			)
			.setDestinationEmailAddress(details.email)
			.setTemplateVariablesFromObject({
				subscription_url: config.services.notify.subscriptionCreateDomain.concat(
					'/projects/',
					details.project.caseReference,
					'/get-updates/subscribed?subscriptionDetails=',
					details.subscriptionDetails
				),
				project_name: details.project.name,
				project_email: details.project.email,
				...(details.project.welshName && { project_name_welsh: details.project.welshName })
			})
			.setReference(`Subscription ${details.project.caseReference} ${details.email}`)
			.sendEmail();
	} catch (e) {
		logger.error(
			{ err: e },
			`Notify service unable to send subscription create email for case reference ${details.project.caseReference}`
		);
	}
};

module.exports = {
	sendIPRegistrationConfirmationEmailToIP,
	sendSubmissionNotification,
	sendSubscriptionCreateNotification
};
