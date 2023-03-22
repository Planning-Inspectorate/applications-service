const getProjectEmailAddress = (session) => {
	if (!session.ProjectEmailAddress) throw new Error('No project email address in app data session');
	return session.ProjectEmailAddress;
};

module.exports = {
	getProjectEmailAddress
};
