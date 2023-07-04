const setBaseUrlMiddleware = (req, res, next) => {
	res.locals.baseUrl = `/projects/${req.params.case_ref}`;
	next();
};

module.exports = {
	setBaseUrlMiddleware
};
