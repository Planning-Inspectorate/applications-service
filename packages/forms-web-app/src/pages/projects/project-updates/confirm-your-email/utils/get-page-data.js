const { getProjectUpdatesEmailSession } = require('../../_session');

const getEmail = (session) => {
	const email = getProjectUpdatesEmailSession(session);

	if (!email) throw new Error('Project updates email session value not true');

	return email;
};

const getPageData = (session) => ({
	email: getEmail(session),
	pageTitle: 'Get updates and confirm email',
	pageHeading: 'Confirm you want to get emails'
});

module.exports = { getPageData };
