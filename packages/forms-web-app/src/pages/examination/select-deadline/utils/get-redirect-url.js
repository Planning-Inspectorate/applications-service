const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { checkSubmissionItem, evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query) => {
	if (isQueryModeEdit(query)) return `${directory}${checkSubmissionItem.route}`;
	else return `${directory}${evidenceOrComment.route}`;
};

module.exports = { getRedirectUrl };
