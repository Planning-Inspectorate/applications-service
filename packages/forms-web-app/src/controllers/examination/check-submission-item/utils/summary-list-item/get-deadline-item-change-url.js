const { getDeadlineItems } = require('../../../session/deadline/items');
const { getSubmissionItems } = require('../../../session/submission-items-session');

const getDeadlineItemChangeUrl = (session, deadlineItemChangeUrl) => {
	const dealineItems = getDeadlineItems(session);
	const submissionItems = getSubmissionItems(session);
	if (submissionItems.length === dealineItems.length) deadlineItemChangeUrl = '';

	return deadlineItemChangeUrl;
};

module.exports = { getDeadlineItemChangeUrl };
