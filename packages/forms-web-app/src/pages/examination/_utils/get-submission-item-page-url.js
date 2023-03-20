const { isQueryModeEdit } = require('../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkSubmissionItem }
		}
	}
} = require('../../../routes/config');

const getSubmissionItemPageUrl = (query, route) => {
	if (isQueryModeEdit(query)) return `${checkSubmissionItem.route}`;
	else if (route) return `${route}`;
	else throw new Error('Route is undefined');
};

module.exports = { getSubmissionItemPageUrl };
