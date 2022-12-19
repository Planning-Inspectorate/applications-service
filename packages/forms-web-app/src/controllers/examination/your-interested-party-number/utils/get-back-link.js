const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { hasInterestedPartyNumber, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLink = (query) =>
	isQueryModeEdit(query)
		? `${directory + checkYourAnswers.route}`
		: `${directory + hasInterestedPartyNumber.route}`;

module.exports = {
	getBackLink
};
