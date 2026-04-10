const { getGetUpdatesEmailSession } = require('../../_session');

const getEmail = (session) => {
	const email = getGetUpdatesEmailSession(session);

	if (!email) throw new Error('Get updates email session value not true');

	return email;
};

const getPageData = (session) => ({
	email: getEmail(session)
});

module.exports = { getPageData };
