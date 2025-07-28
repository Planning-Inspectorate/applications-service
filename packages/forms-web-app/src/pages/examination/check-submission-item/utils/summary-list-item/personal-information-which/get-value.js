const { getSubmissionItemFiles } = require('../../../../_session/submission-items-session');
const {
	getPersonalInformationWhichOptions
} = require('../../../../personal-information-which/config');

const getRersonalInformationWhichArray = (i18n, submissionItem) => {
	const submissionItemFiles = getSubmissionItemFiles(submissionItem);

	let personalInformationWhichArray = [];

	if (submissionItem.commentPersonalInformation === 'yes') {
		const personalInformationWhichOptions = getPersonalInformationWhichOptions(i18n);
		const { text } = personalInformationWhichOptions[1];
		personalInformationWhichArray.push(text);
	}

	submissionItemFiles.forEach((submissionItemFile) => {
		if (submissionItemFile.personalInformation === 'yes')
			personalInformationWhichArray.push(submissionItemFile.fileName);
	});

	return personalInformationWhichArray;
};

const formatPersonalInformationWhichArray = (valueArray) => {
	const valuesAsList = valueArray.reduce((acc, value) => `${acc}<li>${value}</li>`, '');

	return `<ul class="govuk-list">${valuesAsList}</ul>`;
};

const getPersonalInformationWhichValue = (i18n, submissionItem) => {
	const personalInformationWhichArray = getRersonalInformationWhichArray(i18n, submissionItem);
	if (!personalInformationWhichArray.length)
		throw new Error(
			'Submission item does not contain any files or comment with personal information'
		);
	return formatPersonalInformationWhichArray(personalInformationWhichArray);
};

module.exports = { getPersonalInformationWhichValue };
