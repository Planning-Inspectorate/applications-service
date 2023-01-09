const { getDeadlineItems } = require('../../../session/deadline/items');
const { getSubmissionItems } = require('../../../session/submission-items-session');

const showDeadlineItemChangeUrl = (session) => {
	return getSubmissionItems(session).length !== getDeadlineItems(session).length;
};

module.exports = { showDeadlineItemChangeUrl };
