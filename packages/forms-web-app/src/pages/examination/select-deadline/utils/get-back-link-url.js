const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkSubmissionItem, email }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query) ? `${checkSubmissionItem.route}` : `${email.route}`;

module.exports = { getBackLinkUrl };
