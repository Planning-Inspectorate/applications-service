const { getDeadlineItems } = require('../../../session/deadline/items');
const { getSubmissionItems } = require('../../../session/submission-items-session');

const showDeadlineItemChangeUrl = (session) => {
	const dealineItems = getDeadlineItems(session);
	const submissionItems = getSubmissionItems(session);

	return submissionItems.length !== dealineItems.length;
};

module.exports = { showDeadlineItemChangeUrl };
