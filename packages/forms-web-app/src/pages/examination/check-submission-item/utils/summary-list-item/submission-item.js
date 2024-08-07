const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { showDeadlineItemChangeUrl } = require('./show-deadline-item-change-url');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
			pages: { selectDeadline }
		}
	}
} = require('../../../../../routes/config');
const {
	getSubmissionItemTitleByLocale
} = require('../../../_utils/get-content/get-submission-item-title-by-locale');

const getSummaryListItemSubmissionItem = (i18n, session) => {
	const submissionItemValueText = getSubmissionItemTitleByLocale(i18n, session);

	let deadlineItemChangeUrl = `${selectDeadline.route}${editQuery}`;

	if (showDeadlineItemChangeUrl(session) === false) {
		deadlineItemChangeUrl = '';
	}

	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkSubmissionItem.summaryListHeading1'),
		submissionItemValueText,
		deadlineItemChangeUrl
	);
};

module.exports = { getSummaryListItemSubmissionItem };
