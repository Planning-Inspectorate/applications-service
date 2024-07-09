const {
	getDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName
} = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			pages: { nameMyself, nameAgent, nameOrganisation }
		}
	}
} = require('../../../../../routes/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const { submittingForOptionValues } = require('../../../submitting-for/config');

const getSummaryListItemName = (session) => {
	switch (getDeadlineDetailsSubmittingFor(session)) {
		case submittingForOptionValues[1]:
			return { name: 'Full name', url: `${nameMyself.route}${editQuery}` };
		case submittingForOptionValues[2]:
			return {
				name: `Organisation's name`,
				url: `${nameOrganisation.route}${editQuery}`
			};
		case submittingForOptionValues[3]:
			return { name: 'Submitting on behalf of', url: `${nameAgent.route}${editQuery}` };
		default:
			throw new Error('Summary list item name can not be assigned');
	}
};

const getSummaryListName = (session) => {
	const { name, url } = getSummaryListItemName(session);
	return getSummaryListItem(name, getDeadlineDetailsName(session), url);
};

module.exports = { getSummaryListName };
