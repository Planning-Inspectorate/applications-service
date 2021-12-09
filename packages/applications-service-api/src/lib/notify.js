const { createNotifyClient, notifyBuilder } = require('@planning-inspectorate/pins-notify');
const config = require('./config');
const logger = require('./logger');

async function sendIPRegistrationConfirmationEmailToIP(details) {
  try {
    const notifyClient = createNotifyClient.createNotifyClient({
      baseUrl: config.services.notify.baseUrl,
      serviceId: config.services.notify.serviceId,
      apiKey: config.services.notify.apiKey,
    });

    await notifyBuilder
      .reset()
      .setNotifyClient(notifyClient)
      .setTemplateId(config.services.notify.templates.IPRegistrationConfirmationEmailToIP)
      .setDestinationEmailAddress(details.email)
      .setTemplateVariablesFromObject({
        'email address': details.email,
        project_name: details.projectName,
        interested_party_name: details.ipName,
        interested_party_ref: details.ipRef,
        preliminary_meeting_url: config.services.notify.preliminaryMeetingUrl,
        having_your_say_url: config.services.notify.havingYourSayUrl,
      })
      .setReference(details.ipRef)
      .sendEmail();
  } catch (e) {
    logger.error(
      { err: e },
      'Unable to send IP registration confirmation email to interested party.'
    );
  }
}

async function sendMagicLinkToIP(details) {
  try {
    const notifyClient = createNotifyClient.createNotifyClient({
      baseUrl: config.services.notify.baseUrl,
      serviceId: config.services.notify.serviceId,
      apiKey: config.services.notify.apiKey,
    });

    await notifyBuilder
      .reset()
      .setNotifyClient(notifyClient)
      .setTemplateId(config.services.notify.templates.MagicLinkEmail)
      .setDestinationEmailAddress(details.email)
      .setTemplateVariablesFromObject({
        'email address': details.email,
        interested_party_name: details.ipName,
        'planning application number': details.caseRef,
        'magic link': `${config.services.notify.magicLinkDomain}interested-party/confirm-your-email?token=${details.token}`,
      })
      .setReference(details.ipRef)
      .sendEmail();
  } catch (e) {
    logger.error({ err: e }, 'Unable to send magic link email to interested party.');
  }
}

module.exports = {
  sendIPRegistrationConfirmationEmailToIP,
  sendMagicLinkToIP,
};
