const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) => (isQueryModeEdit(query) ? `${checkYourAnswers.route}` : '');

module.exports = {
	getBackLinkUrl
};
