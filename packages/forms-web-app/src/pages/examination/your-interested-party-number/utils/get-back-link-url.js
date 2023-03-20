const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

const {
	routesConfig: {
		examination: {
			pages: { hasInterestedPartyNumber, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query) ? `${checkYourAnswers.route}` : `${hasInterestedPartyNumber.route}`;

module.exports = {
	getBackLinkUrl
};
