const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query) ? `${directory}${checkYourAnswers.route}` : '';

module.exports = {
	getBackLinkUrl
};
