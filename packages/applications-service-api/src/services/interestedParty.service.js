const config = require('../lib/config');

const {
	createInterestedParty: createNIInterestedParty
} = require('../services/interestedParty.ni.service');
const { publishRegisterRepresentation } = require('./backoffice.publish.service');
const { sendIPRegistrationConfirmationEmailToIP } = require('../lib/notify');
const { getApplication } = require('./application.service');
const { mapInterestedParty } = require('../utils/interestedParty.mapper');

const createInterestedParty = async (createInterestedPartyRequest) => {
	if (isBackOfficeInterestedPartyRegistration(createInterestedPartyRequest.case_ref)) {
		const { referenceId } = await createBackOfficeInterestedParty(createInterestedPartyRequest);
		return { referenceId };
	} else {
		const interestedParty = await createNIInterestedParty(createInterestedPartyRequest);
		return {
			referenceId: interestedParty.ID
		};
	}
};

const createBackOfficeInterestedParty = async (createInterestedPartyRequest) => {
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

const isBackOfficeInterestedPartyRegistration = (caseReference) =>
	config.backOfficeIntegration.interestedParty.postInterestedParty.caseReferences.includes(
		caseReference
	);

module.exports = { createInterestedParty };
