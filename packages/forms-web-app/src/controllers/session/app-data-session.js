const getAppDataSession = (session) => {
	const appData = session?.appData;
	if (!appData) throw new Error('No app data in session');
	return appData;
};

const getProjectEmailAddress = (session) => {
	const appDataSession = getAppDataSession(session);
	if (!appDataSession.ProjectEmailAddress)
		throw new Error('No project email address in app data session');
	return appDataSession.ProjectEmailAddress;
};

module.exports = {
	getAppDataSession,
	getProjectEmailAddress
};
