const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const isSubmissionTypePrevious = (session, newSubmissionType) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const previousSubmissionItemType = activeSubmissionItem[evidenceOrComment.sessionId];

	return previousSubmissionItemType === newSubmissionType;
};

module.exports = { isSubmissionTypePrevious };
