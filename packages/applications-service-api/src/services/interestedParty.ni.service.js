const notify = require('../lib/notify');
const IPFactory = require('../factories/interested-party/factory');
const { getApplication } = require('../repositories/project.ni.repository');
const {
	createInterestedParty: createInterestedPartyRepository,
	updateInterestedParty
} = require('../repositories/interestedParty.ni.repository');
const { getDate } = require('../utils/date-utils');

const createInterestedParty = async (createInterestedPartyRequest) => {
	const interestedParty = IPFactory.createIP(createInterestedPartyRequest.behalf).get(
		createInterestedPartyRequest
	);

	const interestedPartyNI = await createInterestedPartyRepository(interestedParty);

	const caseReference = interestedPartyNI.caseref;
	const project = await getApplication(caseReference);

	const { ProjectName: projectName, ProjectEmailAddress: projectEmail } = project.dataValues;
	const { email, ipName, ipRef } = IPFactory.createIP(interestedPartyNI.behalf).getEmailingDetails(
		interestedPartyNI
	);
	await notify.sendIPRegistrationConfirmationEmailToIP({
		email,
		projectName,
		ipName,
		ipRef,
		projectEmail
	});
	await updateInterestedParty(interestedPartyNI.ID, { emailed: getDate() });

	return interestedPartyNI;
};

module.exports = {
	createInterestedParty
};
