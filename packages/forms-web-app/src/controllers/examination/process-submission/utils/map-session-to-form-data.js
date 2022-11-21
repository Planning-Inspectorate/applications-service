const FormData = require('form-data');
const mapSessionToFormData = (examination, item) => {
	const { hasInterestedPartyNo, name, email } = examination;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('email', email);
	formData.append('interestedParty', `${hasInterestedPartyNo === 'yes'}`);
	// this should be examination.title ("title": "4 August 2022 - Deadline 1A" - strip date)
	formData.append('deadline', item.submissionItem);

	// this the deadline item selected - the actual text for the deadline item
	formData.append('submissionType', item.submissionType);

	return formData;
};

const getCommentAndFiles = (item, formData) => {
	let result = [];
	// map the comment / files into an array with from data
	if (item.comment) {
		formData.append('representation', item.comment);
		result.push(formData);
	}

	return result;
};

module.exports = {
	mapSessionToFormData,
	getCommentAndFiles
};
