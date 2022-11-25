const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { editQuery } = require('./config');
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

	return getSummaryListItemWithLink(
		'Deadline item',
		submissionItemValueText,
		`${directory}${selectDeadline.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmissionItem };
