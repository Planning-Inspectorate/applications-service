const {
	routesConfig: {
		examination: {
			pages: { email, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query) ? `${checkYourAnswers.route}` : `${email.route}`;

module.exports = {
	getRedirectUrl
};
