const notify = require('../lib/notify');
const IPFactory = require('../factories/interested-party/factory');
const { getApplication } = require('../repositories/project.ni.repository');
const {
	createInterestedParty: createInterestedPartyRepository,
	updateInterestedParty
} = require('../repositories/interestedParty.ni.repository');

const createInterestedParty = async (interestedPartyData) => {
	const interestedParty = await createInterestedPartyRepository(interestedPartyData);

	const caseReference = interestedParty.caseref;
	const project = await getApplication(caseReference);

	const { ProjectName: projectName, ProjectEmailAddress: projectEmail } = project.dataValues;
	const { email, ipName, ipRef } = IPFactory.createIP(interestedParty.behalf).getEmailingDetails(
		interestedParty
	);
	await notify.sendIPRegistrationConfirmationEmailToIP({
		email,
		projectName,
		ipName,
		ipRef,
		projectEmail
	});
	await updateInterestedParty(interestedParty.id, { emailed: new Date() });

	return interestedParty;
};

module.exports = {
	createInterestedParty
};
