const FormData = require('form-data');
const { getExaminationSession } = require('../../_session/examination-session');
const { getProjectPromoterName } = require('../../../../session');
const { getDeadlineDetailsName } = require('../../_session/deadline/details/name');
const { isUserApplicant } = require('../../_session/deadline/helpers');
const getDeadlineTitle = (title) => {
	const titleSplit = title.split('-');
	return titleSplit[1].trim();
};
const getName = (session) => {
	return isUserApplicant(session)
		? getProjectPromoterName(session)
		: getDeadlineDetailsName(session);
};

const mapSessionToCommonFormData = (session, item) => {
	const { hasInterestedPartyNo, email, interestedPartyNumber, title } =
		getExaminationSession(session);
	const formData = new FormData();
	formData.append('name', getName(session));
	formData.append('email', email);
	formData.append('interestedParty', `${hasInterestedPartyNo === 'yes'}`);
	formData.append('deadline', getDeadlineTitle(title));
	formData.append('submissionType', item.submissionItem);

	if (interestedPartyNumber) formData.append('ipReference', interestedPartyNumber);
	return formData;
};

const markFormAsPersonalInfo = (form, item) => {
	if (item.personalInformation === 'yes') form.append('sensitiveData', 'true');
};

module.exports = {
	mapSessionToCommonFormData,
	markFormAsPersonalInfo
};
