const {
	routesConfig: {
		examination: {
			directory,
			pages: {
				submittingFor: { route: submittingForRoute },
				checkYourAnswers
			}
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query)
		? `${directory + checkYourAnswers.route}`
		: `${directory + submittingForRoute}`;

module.exports = {
	getRedirectUrl
};
