const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { getDeadlineItemChangeUrl } = require('./get-deadline-item-change-url');
const { editQuery } = require('./config');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { selectDeadline }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemSubmissionItem = (submissionItem, session) => {
	const submissionItemValueText = submissionItem[selectDeadline.sessionId[2]];

	if (!submissionItemValueText)
		throw new Error('Submission item does not have a submission item value');

	const deadlineItemChangeUrl = getDeadlineItemChangeUrl(
		session,
		`${directory}${selectDeadline.route}${editQuery}`
	);

	return getSummaryListItem('Deadline item', submissionItemValueText, deadlineItemChangeUrl);
};

module.exports = { getSummaryListItemSubmissionItem };
