const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { editQuery } = require('./config');
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

	return getSummaryListItemWithLink(
		'Your comment',
		submissionItemComment,
		`${directory}${enterComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEnterComment };
