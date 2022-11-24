const {
	getSubmissionItemType,
	getSubmissionItemPersonalInformation,
	getActiveSubmissionItemFiles,
	getActiveSubmissionItem
} = require('../../session/submission-items-session');
const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory,
			pages: {
				addAnotherDeadlineItem,
				evidenceOrComment,
				personalInformation,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles
			}
		}
	}
} = require('../../../../routes/config');

const getOptionTwoBackLinkUrl = (submissionItemFilesLength, hasPersonalInformation) =>
	submissionItemFilesLength > 1 && hasPersonalInformation
		? `${directory}${personalInformationWhichFiles.route}`
		: `${directory}${personalInformationFiles.route}`;

const getOptionThreeBackLinkUrl = (hasPersonalInformation) =>
	hasPersonalInformation
		? `${directory}${personalInformationWhichCommentFiles.route}`
		: `${directory}${personalInformationCommentFiles.route}`;

const getBackLinkUrl = (query, session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const submissionItemType = getSubmissionItemType(activeSubmissionItem);
	const hasPersonalInformation =
		getSubmissionItemPersonalInformation(activeSubmissionItem) ===
		personalInformation.options[1].value;

	let backLinkUrl;

	if (isQueryModeEdit(query)) {
		backLinkUrl = `${directory}${addAnotherDeadlineItem.route}`;
	} else if (submissionItemType === evidenceOrComment.options[1].value) {
		backLinkUrl = `${directory}${personalInformationComment.route}`;
	} else if (submissionItemType === evidenceOrComment.options[2].value) {
		backLinkUrl = getOptionTwoBackLinkUrl(
			getActiveSubmissionItemFiles(session),
			hasPersonalInformation
		);
	} else if (submissionItemType === evidenceOrComment.options[3].value) {
		backLinkUrl = getOptionThreeBackLinkUrl(hasPersonalInformation);
	}

	if (!backLinkUrl) throw new Error('Unable to assign back link URL');

	return {
		backLinkUrl
	};
};

module.exports = { getBackLinkUrl };
