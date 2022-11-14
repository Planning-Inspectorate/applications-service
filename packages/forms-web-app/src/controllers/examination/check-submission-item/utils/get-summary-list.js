const { getActiveSubmissionItem } = require('../../session/submission-items-session');
const {
	personalInformationWhichIsValid
} = require('./summary-list-item/personal-information-which/is-valid');
const {
	getSummaryListItemEnterComment,
	getSummaryListItemEvidenceOrComment,
	getSummaryListItemSelectFile,
	getSummaryListItemPersonalInformation,
	getSummaryListItemPersonalInformationWhich,
	getSummaryListItemSubmissionItem
} = require('./summary-list-item');

const submissionItemHasFiles = (submissionItem) =>
	submissionItem?.files && Array.isArray(submissionItem?.files) && submissionItem?.files?.length;

const submissionItemHasComment = (submissionItem) => submissionItem.comment;

const getSummaryList = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const summaryList = [];

	summaryList.push(getSummaryListItemSubmissionItem(activeSubmissionItem));
	summaryList.push(getSummaryListItemEvidenceOrComment(activeSubmissionItem));

	if (submissionItemHasFiles(activeSubmissionItem))
		summaryList.push(getSummaryListItemSelectFile(activeSubmissionItem));

	if (submissionItemHasComment(activeSubmissionItem))
		summaryList.push(getSummaryListItemEnterComment(activeSubmissionItem));

	summaryList.push(getSummaryListItemPersonalInformation(activeSubmissionItem));

	if (personalInformationWhichIsValid(activeSubmissionItem)) {
		const summaryListItemPersonalInformationWhich =
			getSummaryListItemPersonalInformationWhich(activeSubmissionItem);

		summaryList.push(summaryListItemPersonalInformationWhich);
	}

	return { summaryList };
};

module.exports = { getSummaryList };
