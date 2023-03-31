const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { selectDeadline, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query, session) => {
	let redirectUrl = selectDeadline.route;

	if (isQueryModeEdit(query)) redirectUrl = checkYourAnswers.route;
	else if (session.examination?.showChooseDeadline) redirectUrl = 'choose-deadline';

	return redirectUrl;
};

module.exports = {
	getRedirectUrl
};
