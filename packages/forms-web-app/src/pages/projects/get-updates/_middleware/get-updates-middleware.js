const { getUpdatesIndexURL } = require('../index/utils/get-updates-index-url');

const getUpdatesMiddleware = (req, res, next) => {
	const {
		session,
		originalUrl,
		params: { case_ref: caseRef }
	} = req;
	const { getUpdates } = session;
	if (!getUpdates) {
		return res.redirect(`/projects/${caseRef}`);
	}

	const indexURL = getUpdatesIndexURL(caseRef);
	const { caseRef: sessionCaseRef } = getUpdates;
	if (caseRef !== sessionCaseRef && originalUrl !== indexURL) {
		return res.redirect(indexURL);
	}

	next();
};

module.exports = { getUpdatesMiddleware };
