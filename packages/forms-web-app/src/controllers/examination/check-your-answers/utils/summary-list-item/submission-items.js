const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { getSubmissionItems } = require('../../../session/submission-items-session');

const getSubmissionItemsValue = (submissionItems) => {
	const submissionItemsValue = submissionItems.reduce(
		(acc, submissionItem) => `${acc}<li>${submissionItem.submissionItem}</li>`,
		''
	);

	return `<ul class="govuk-list">${submissionItemsValue}</ul>`;
};

const getSummaryListItemSubmissionItems = (session) => {
	return getSummaryListItemWithLink(
		'Deadline items added',
		getSubmissionItemsValue(getSubmissionItems(session)),
		''
	);
};

module.exports = { getSummaryListItemSubmissionItems };
