const {
	getDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName
} = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemName = (session) => {
	switch (getDeadlineDetailsSubmittingFor(session)) {
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
	getSummaryListItem(getSummaryListItemName(session), getDeadlineDetailsName(session));

module.exports = { getSummaryListName };
