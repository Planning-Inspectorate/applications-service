const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { hasInterestedPartyNumber, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query)
		? `${directory + checkYourAnswers.route}`
		: `${directory + hasInterestedPartyNumber.route}`;

module.exports = {
	getBackLinkUrl
};
