const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkSubmissionItem, evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query) => {
	if (isQueryModeEdit(query)) return `${checkSubmissionItem.route}`;
	else return `${evidenceOrComment.route}`;
};

module.exports = { getRedirectUrl };
