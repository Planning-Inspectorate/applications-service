const forwardView = (viewObject) => (req, res, next) => {
	if (viewObject) {
		req.session.currentView = viewObject;
	}

	return next();
};

module.exports = {
	forwardView
};
