const { getSubmissionItems } = require('../../../_session/submission-items-session');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const { getContentByLocale } = require('../../../../_utils/get-content-by-locale');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem }
		}
	}
} = require('../../../../../routes/config');

const getSubmissionItemsValue = (i18n, submissionItems) => {
	const submissionItemsList = submissionItems.reduce((submissionItemList, submissionItem) => {
		const submissionItemTitle = getContentByLocale(
			i18n,
			submissionItem.submissionItem,
			submissionItem.submissionItemWelsh
		);

		return `${submissionItemList}<li>${submissionItemTitle}</li>`;
	}, '');

	return `<ul class="govuk-list">${submissionItemsList}</ul>`;
};

const getSummaryListItemSubmissionItems = (i18n, session) => {
	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkYourAnswers.submissions.summaryListHeading1'),
		getSubmissionItemsValue(i18n, getSubmissionItems(session)),
		`${addAnotherDeadlineItem.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmissionItems };
