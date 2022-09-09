const forwardView = (viewObject) => (req, res, next) => {
	if (viewObject) {
		req.currentView = viewObject;
	}

	return next();
};

module.exports = {
	forwardView
};
