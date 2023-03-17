const { getSubmissionItems } = require('../../../_session/submission-items-session');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { addAnotherDeadlineItem }
		}
	}
} = require('../../../../../routes/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const getSubmissionItemsValue = (submissionItems) => {
	const submissionItemsList = submissionItems.reduce(
		(submissionItemList, submissionItem) =>
			`${submissionItemList}<li>${submissionItem.submissionItem}</li>`,
		''
	);

	return `<ul class="govuk-list">${submissionItemsList}</ul>`;
};

const getSummaryListItemSubmissionItems = (session) => {
	return getSummaryListItem(
		'Deadline items added',
		getSubmissionItemsValue(getSubmissionItems(session)),
		`${directory}${addAnotherDeadlineItem.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSubmissionItems };
