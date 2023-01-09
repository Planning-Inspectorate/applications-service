const {
	routesConfig: {
		examination: {
			directory,
			pages: { email, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query) ? `${directory + checkYourAnswers.route}` : `${directory + email.route}`;

module.exports = {
	getRedirectUrl
};
