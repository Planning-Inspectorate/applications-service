const {
	getDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName
} = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { submittingFor, nameMyself, nameAgent, nameOrganisation }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemName = (session) => {
	switch (getDeadlineDetailsSubmittingFor(session)) {
		case submittingFor.options[1].value:
			return { name: 'Full name', url: `${directory}${nameMyself.route}` };
		case submittingFor.options[2].value:
			return { name: `Organisation's name`, url: `${directory}${nameOrganisation.route}` };
		case submittingFor.options[3].value:
			return { name: 'Submitting on behalf of', url: `${directory}${nameAgent.route}` };
		default:
			throw new Error('Summary list item name can not be assigned');
	}
};

const getSummaryListName = (session) => {
	const { name, url } = getSummaryListItemName(session);
	return getSummaryListItem(name, getDeadlineDetailsName(session), url);
};

module.exports = { getSummaryListName };
