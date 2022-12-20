const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { submittingFor, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query)
		? `${directory + checkYourAnswers.route}`
		: `${directory + submittingFor.route}`;

module.exports = {
	getBackLinkUrl
};
