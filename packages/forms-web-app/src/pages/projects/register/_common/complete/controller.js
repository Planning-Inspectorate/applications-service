const { getProjectsURL } = require('../../../../projects/_utils/get-projects-url');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const logger = require('../../../../../lib/logger');
const { viewModel } = require('./_utils/viewModel');
const {
	getSessionBase,
	getSession
} = require('../../../../../controllers/register/common/session');

const getRegisterCompleteController = (req, res) => {
	try {
		const { session } = req;
		const { caseRef } = session;
		const key = getKeyFromUrl(req.originalUrl);
		const { ipRefNo } = getSessionBase(session, key);
		const { email } = getSession(session, key);

		return res.render('projects/register/_common/complete/view.njk', {
			...viewModel[key],
			ipRefNo,
			email,
			projectURL: getProjectsURL(caseRef)
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = {
	getRegisterCompleteController
};
