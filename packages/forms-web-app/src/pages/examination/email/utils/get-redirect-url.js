const {
	routesConfig: {
		examination: {
			directory,
			pages: { selectDeadline, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query)
		? `${directory + checkYourAnswers.route}`
		: `${directory + selectDeadline.route}`;

module.exports = {
	getRedirectUrl
};
