const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			pages: { submittingFor, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query) ? `${checkYourAnswers.route}` : `${submittingFor.route}`;

module.exports = {
	getBackLinkUrl
};
