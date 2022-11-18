const FormData = require('form-data');
const getDeadlineTitle = (title) => {
	const titleSplit = title.split('-');
	return titleSplit[1].trim();
};

const mapSessionToCommonFormData = (examination, item) => {
	const { hasInterestedPartyNo, email, title, name } = examination;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('email', email);
	formData.append('interestedParty', `${hasInterestedPartyNo === 'yes'}`);
	formData.append('deadline', getDeadlineTitle(title));
	formData.append('submissionType', item.submissionItem);

	if (examination.interestedPartyNumber)
		formData.append('ipReference', examination.interestedPartyNumber);
	return formData;
};

const markFormAsPersonalInfo = (form, item) => {
	if (item.personalInformation === 'yes') form.append('sensitiveData', 'true');
};

module.exports = {
	mapSessionToCommonFormData,
	markFormAsPersonalInfo
};
