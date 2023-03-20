const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
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
		`${enterComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEnterComment };
