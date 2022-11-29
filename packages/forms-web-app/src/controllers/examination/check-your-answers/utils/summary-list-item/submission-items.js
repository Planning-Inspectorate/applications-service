const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { getSubmissionItems } = require('../../../session/submission-items-session');

const getSubmissionItemsValue = (submissionItems) => {
	const submissionItemsList = submissionItems.reduce(
		(submissionItemList, submissionItem) =>
			`${submissionItemList}<li>${submissionItem.submissionItem}</li>`,
		''
	);

	return `<ul class="govuk-list">${submissionItemsList}</ul>`;
};

const getSummaryListItemSubmissionItems = (session) => {
	return getSummaryListItemWithLink(
		'Deadline items added',
		getSubmissionItemsValue(getSubmissionItems(session))
	);
};

module.exports = { getSummaryListItemSubmissionItems };
