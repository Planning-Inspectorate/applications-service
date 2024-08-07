const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
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

const getSummaryList = (i18n, session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const summaryList = [];

	summaryList.push(getSummaryListItemSubmissionItem(i18n, session));
	summaryList.push(getSummaryListItemEvidenceOrComment(i18n, activeSubmissionItem));

	if (submissionItemHasFiles(activeSubmissionItem))
		summaryList.push(getSummaryListItemSelectFile(i18n, activeSubmissionItem));

	if (submissionItemHasComment(activeSubmissionItem))
		summaryList.push(getSummaryListItemEnterComment(i18n, activeSubmissionItem));

	summaryList.push(getSummaryListItemPersonalInformation(i18n, activeSubmissionItem));

	if (personalInformationWhichIsValid(activeSubmissionItem)) {
		const summaryListItemPersonalInformationWhich = getSummaryListItemPersonalInformationWhich(
			i18n,
			activeSubmissionItem
		);

		summaryList.push(summaryListItemPersonalInformationWhich);
	}

	return { summaryList };
};

module.exports = { getSummaryList };
