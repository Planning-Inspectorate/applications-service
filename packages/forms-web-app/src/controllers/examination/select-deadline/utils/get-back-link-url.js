const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { checkSubmissionItem, email }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query) =>
	isQueryModeEdit(query)
		? `${directory}${checkSubmissionItem.route}`
		: `${directory}${email.route}`;

module.exports = { getBackLinkUrl };
