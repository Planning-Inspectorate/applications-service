const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { showDeadlineItemChangeUrl } = require('./show-deadline-item-change-url');
const { editQuery } = require('../../../../utils/queryMode');
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

	let deadlineItemChangeUrl = `${directory}${selectDeadline.route}${editQuery}`;

	if (showDeadlineItemChangeUrl(session) === false) {
		deadlineItemChangeUrl = '';
	}

	return getSummaryListItem('Deadline item', submissionItemValueText, deadlineItemChangeUrl);
};

module.exports = { getSummaryListItemSubmissionItem };
