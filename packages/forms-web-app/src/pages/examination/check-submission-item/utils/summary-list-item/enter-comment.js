const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
			pages: { enterComment }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEnterComment = (i18n, submissionItem) => {
	const submissionItemComment = submissionItem.comment;

	if (!submissionItemComment) throw new Error('Submission item does not have a comment');

	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkSubmissionItem.summaryListHeading4'),
		submissionItemComment,
		`${enterComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEnterComment };
