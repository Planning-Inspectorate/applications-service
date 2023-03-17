const { isQueryModeEdit } = require('../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { checkSubmissionItem }
		}
	}
} = require('../../../routes/config');

const getSubmissionItemPageUrl = (query, route) => {
	if (isQueryModeEdit(query)) return `${directory}${checkSubmissionItem.route}`;
	else if (route) return `${directory}${route}`;
	else throw new Error('Route is undefined');
};

module.exports = { getSubmissionItemPageUrl };
