const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const {
	createInterestedParty: createNIInterestedParty
} = require('../services/interestedParty.ni.service');
const { publishRegisterRepresentation } = require('./backoffice.publish.service');
const { sendIPRegistrationConfirmationEmailToIP } = require('../lib/notify');
const { getApplication } = require('./application.backoffice.service');
const { mapInterestedParty } = require('../utils/interestedParty.mapper');

const createInterestedParty = async (createInterestedPartyRequest) => {
	if (isBackOfficeCaseReference(createInterestedPartyRequest.case_ref)) {
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
	const isProjectWelsh = application.regions.includes('wales');
	const details = {
		email: contact.email,
		projectName: application.projectName,
		ipName: `${contact.firstName} ${contact.lastName}`,
		ipRef: interestedParty.referenceId,
		projectEmail: application.projectEmailAddress,
		...(isProjectWelsh && {
			projectNameWelsh: application.projectNameWelsh || application.projectName
		})
	};
	await sendIPRegistrationConfirmationEmailToIP(details);
};

module.exports = { createInterestedParty };
