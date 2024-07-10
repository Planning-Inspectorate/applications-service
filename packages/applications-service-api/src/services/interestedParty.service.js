const { publishRegisterRepresentation } = require('./publish.service');
const { sendIPRegistrationConfirmationEmailToIP } = require('../lib/notify');
const { getApplication } = require('./application.service');
const { mapInterestedParty } = require('../utils/interestedParty.mapper');

const createInterestedParty = async (createInterestedPartyRequest) => {
	const interestedParty = mapInterestedParty(createInterestedPartyRequest);
	await publishRegisterRepresentation(interestedParty);

	const application = await getApplication(createInterestedPartyRequest.case_ref);
	await sendEmailConfirmation(interestedParty, application);

	return { referenceId: interestedParty.referenceId };
};

const sendEmailConfirmation = async (interestedParty, application) => {
	const contact = interestedParty.representative || interestedParty.represented;
	await sendIPRegistrationConfirmationEmailToIP({
		email: contact.email,
		projectName: application.projectName,
		ipName: `${contact.firstName} ${contact.lastName}`,
		ipRef: interestedParty.referenceId,
		projectEmail: application.projectEmailAddress
	});
};

module.exports = { createInterestedParty };
