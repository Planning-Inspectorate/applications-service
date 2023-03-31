const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkSubmissionItem, email }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query, session) => {
	let backLinkUrl = email.route;

	if (isQueryModeEdit(query)) backLinkUrl = checkSubmissionItem.route;
	else if (session.examination?.showChooseDeadline) backLinkUrl = 'choose-deadline';

	return backLinkUrl;
};

module.exports = { getBackLinkUrl };
