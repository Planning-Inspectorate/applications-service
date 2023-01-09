const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { editQuery } = require('../../../../utils/queryMode');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { enterComment }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEnterComment = (submissionItem) => {
	const submissionItemComment = submissionItem.comment;

	if (!submissionItemComment) throw new Error('Submission item does not have a comment');

	return getSummaryListItem(
		'Your comment',
		submissionItemComment,
		`${directory}${enterComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEnterComment };
