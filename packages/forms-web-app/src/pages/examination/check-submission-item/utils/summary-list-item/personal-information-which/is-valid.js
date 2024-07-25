const {
	getSubmissionItemPersonalInformation,
	getSubmissionItemType,
	getSubmissionItemFiles
} = require('../../../../_session/submission-items-session');
const { evidenceOrCommentValues } = require('../../../../evidence-or-comment/config');
const { personalInformationOptionValues } = require('../../../../personal-information/config');

const personalInformationWhichIsValid = (submissionItem) => {
	const submissionItemPersonalInformation = getSubmissionItemPersonalInformation(submissionItem);
	const hasPersonalInformation =
		submissionItemPersonalInformation === personalInformationOptionValues[1];

	if (!hasPersonalInformation) return false;

	let isValid = false;

	const submissionItemType = getSubmissionItemType(submissionItem);

	if (submissionItemType === evidenceOrCommentValues[2]) {
		if (getSubmissionItemFiles(submissionItem).length > 1) isValid = true;
	} else if (submissionItemType === evidenceOrCommentValues[3]) isValid = true;

	return isValid;
};

module.exports = { personalInformationWhichIsValid };
