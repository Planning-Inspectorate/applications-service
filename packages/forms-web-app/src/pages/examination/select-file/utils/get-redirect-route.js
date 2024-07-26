const {
	getSubmissionItemType,
	getActiveSubmissionItem
} = require('../../_session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { personalInformationCommentFiles, personalInformationFiles }
		}
	}
} = require('../../../../routes/config');
const { evidenceOrCommentValues } = require('../../evidence-or-comment/config');

const getRedirectRoute = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const activeSubmissionItemType = getSubmissionItemType(activeSubmissionItem);

	let redirectUrl;

	if (activeSubmissionItemType === evidenceOrCommentValues[2])
		redirectUrl = personalInformationFiles.route;
	else if (activeSubmissionItemType === evidenceOrCommentValues[3])
		redirectUrl = personalInformationCommentFiles.route;

	if (!redirectUrl) throw new Error('Value does not match a required submission type');

	return redirectUrl;
};

module.exports = { getRedirectRoute };
