const { getDeadlineSubmittingFor, getDeadlineName } = require('../../../../session/deadline');
const { getSummaryListItemWithHtml } = require('../../../../utils/get-summary-list-item-with-html');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemName = (session) => {
	switch (getDeadlineSubmittingFor(session)) {
		case submittingFor.options[1].value:
			return 'Full name';
		case submittingFor.options[2].value:
			return `Organisation's name`;
		case submittingFor.options[3].value:
			return 'Submitting on behalf of';
		default:
			throw new Error('Summary list item name can not be assigned');
	}
};

const getSummaryListName = (session) =>
	getSummaryListItemWithHtml(getSummaryListItemName(session), getDeadlineName(session));

module.exports = { getSummaryListName };
