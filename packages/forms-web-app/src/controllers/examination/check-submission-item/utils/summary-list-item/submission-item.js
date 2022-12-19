const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { editQuery } = require('../../../../utils/queryMode');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { selectDeadline }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemSubmissionItem = (submissionItem) => {
	const submissionItemValueText = submissionItem[selectDeadline.sessionId[2]];

	if (!submissionItemValueText)
		throw new Error('Submission item does not have a submission item value');

	return getSummaryListItem(
		'Deadline item',
		submissionItemValueText,
		`${directory}${selectDeadline.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmissionItem };
