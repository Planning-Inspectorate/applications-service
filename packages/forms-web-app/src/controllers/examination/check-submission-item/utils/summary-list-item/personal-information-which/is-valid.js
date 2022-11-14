const {
	getSubmissionItemPersonalInformation,
	getSubmissionItemType,
	getSubmissionItemFiles
} = require('../../../../session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, personalInformation }
		}
	}
} = require('../../../../../../routes/config');

const personalInformationWhichIsValid = (submissionItem) => {
	const submissionItemPersonalInformation = getSubmissionItemPersonalInformation(submissionItem);
	const hasPersonalInformation =
		submissionItemPersonalInformation === personalInformation.options[1].value;

	if (!hasPersonalInformation) return false;

	let isValid = false;

	const submissionItemType = getSubmissionItemType(submissionItem);

	if (submissionItemType === evidenceOrComment.options[2].value) {
		if (getSubmissionItemFiles(submissionItem).length > 1) isValid = true;
	} else if (submissionItemType === evidenceOrComment.options[3].value) isValid = true;

	return isValid;
};

module.exports = { personalInformationWhichIsValid };
