const { getUpdatesIndexURL } = require('../index/utils/get-updates-index-url');

const getUpdatesMiddleware = (req, res, next) => {
	const {
		session,
		originalUrl,
		params: { case_ref: caseRef }
	} = req;
	const { getUpdates } = session;
	const { caseRef: sessionCaseRef } = getUpdates;

	const indexURL = getUpdatesIndexURL(caseRef);

	if (caseRef !== sessionCaseRef && originalUrl !== indexURL) {
		return res.redirect(indexURL);
	}

	next();
};

module.exports = { getUpdatesMiddleware };
