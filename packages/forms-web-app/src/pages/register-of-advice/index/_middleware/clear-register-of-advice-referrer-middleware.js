const clearRegisterOfAdviceReferrerMiddleware = (req, res, next) => {
	if (req.session && req.session.registerOfAdviceBackLink) {
		delete req.session.registerOfAdviceBackLink;
	}
	next();
};

module.exports = { clearRegisterOfAdviceReferrerMiddleware };

// const { getRegisterOfAdviceIndexURL } = require('../../../register-of-advice/index/_utils/get-register-of-advice-index-url');

// const clearRegisterOfAdviceReferrerMiddleware = (req, res, next) => {
//     const indexPath = getRegisterOfAdviceIndexURL();
//     // Only clear if the request is for the index page
//     if (
//         req.session &&
//         req.session.registerOfAdviceBackLink &&
//         req.path === indexPath
//     ) {
//         delete req.session.registerOfAdviceBackLink;
//     }
//     next();
// };

// module.exports = { clearRegisterOfAdviceReferrerMiddleware };
