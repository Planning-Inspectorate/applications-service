const { getDeadlineItems } = require('../../../_session/deadline/items');
const { getSubmissionItems } = require('../../../_session/submission-items-session');

const showDeadlineItemChangeUrl = (session) => {
	return getSubmissionItems(session).length !== getDeadlineItems(session).length;
};

module.exports = { showDeadlineItemChangeUrl };
