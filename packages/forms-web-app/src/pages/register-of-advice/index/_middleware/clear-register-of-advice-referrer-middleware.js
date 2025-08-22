const clearRegisterOfAdviceReferrerMiddleware = (req, res, next) => {
	if (req.session && req.session.registerOfAdviceBackLink) {
		delete req.session.registerOfAdviceBackLink;
	}
	next();
};

module.exports = { clearRegisterOfAdviceReferrerMiddleware };
