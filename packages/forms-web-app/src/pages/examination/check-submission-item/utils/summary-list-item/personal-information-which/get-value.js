const { getSubmissionItemFiles } = require('../../../../_session/submission-items-session');

const getRersonalInformationWhichArray = (submissionItem) => {
	const submissionItemFiles = getSubmissionItemFiles(submissionItem);

	let personalInformationWhichArray = [];

	if (submissionItem.commentPersonalInformation === 'yes')
		personalInformationWhichArray.push('My comment');

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

const getPersonalInformationWhichValue = (submissionItem) => {
	const personalInformationWhichArray = getRersonalInformationWhichArray(submissionItem);
	if (!personalInformationWhichArray.length)
		throw new Error(
			'Submission item does not contain any files or comment with personal information'
		);
	return formatPersonalInformationWhichArray(personalInformationWhichArray);
};

module.exports = { getPersonalInformationWhichValue };
