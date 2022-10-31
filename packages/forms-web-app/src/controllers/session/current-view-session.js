const getCurrentViewSession = (session) => {
	const currentView = session?.currentView;
	if (!currentView) throw new Error('No current view in session');
	return currentView;
};

module.exports = {
	getCurrentViewSession
};
