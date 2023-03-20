const {
	routesConfig: {
		examination: {
			pages: { selectDeadline, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const getRedirectUrl = (query) =>
	isQueryModeEdit(query) ? `${checkYourAnswers.route}` : `${selectDeadline.route}`;

module.exports = {
	getRedirectUrl
};
