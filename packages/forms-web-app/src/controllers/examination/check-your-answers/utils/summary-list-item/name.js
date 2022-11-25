const { getDeadlineSubmittingFor, getDeadlineName } = require('../../../../session/deadline');
const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../../routes/config');

const getName = (session) => {
	switch (getDeadlineSubmittingFor(session)) {
		case submittingFor.options[1].value:
			return 'Full name';
		case submittingFor.options[2].value:
			return `Organisation's name`;
		case submittingFor.options[3].value:
			return 'Submitting on behalf of';
		default:
			throw new Error('Get name can not be returned');
	}
};

const getSummaryListName = (session) =>
	getSummaryListItemWithLink(getName(session), getDeadlineName(session), '');

module.exports = { getSummaryListName };
