const { getDeadlineTitle } = require('../../../session/deadline-session');
const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session) => {
	return {
		deadlineTitle: getDeadlineTitle(session),
		pageTitle: checkYourAnswers.name,
		subtitle: 'Your details',
		title: checkYourAnswers.name
	};
};

module.exports = { getPageData };
