const { getProjectsIndexURL } = require('../../../index/_utils/get-projects-index-url');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const logger = require('../../../../../lib/logger');
const { getSessionBase } = require('../../../../../controllers/register/common/session');

const getRegisterCompleteController = (req, res) => {
	try {
		const { params, session } = req;
		const { case_ref: caseRef } = params;
		const key = getKeyFromUrl(req.originalUrl);
		const { ipRefNo } = getSessionBase(session, key);

		return res.render('projects/register/_common/complete/view.njk', {
			key,
			ipRefNo,
			projectsIndexURL: getProjectsIndexURL(caseRef),
			backLinkUrl: null
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = {
	getRegisterCompleteController
};
