const {
	routesConfig: {
		examination: {
			pages: {
				submittingFor: { route: submittingForRoute },
				checkYourAnswers
			}
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query) ? `${checkYourAnswers.route}` : `${submittingForRoute}`;

module.exports = {
	getRedirectUrl
};
