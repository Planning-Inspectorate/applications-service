const {
	VIEW: { REGISTER }
} = require('../../../../lib/views');
const { nsipProjectLink } = require('../../../../lib/nsip-project-link');
const { getKeyFromUrl } = require('../get-key-from-url');
const logger = require('../../../../lib/logger');
const { viewModel } = require('./viewModel');
const { getSessionBase, getSession } = require('../session');

const getConfirmation = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const { ipRefNo } = getSessionBase(session, key);
		const { email } = getSession(session, key);

		if (session.mode === 'draft') {
			session.ipRefNo = ipRefNo;
			return res.redirect(`/${REGISTER[key.toUpperCase()].REGISTRATION_SAVED}`);
		} else {
			return res.render(REGISTER.COMMON.REGISTRATION_COMPLETE, {
				...viewModel[key],
				ipRefNo,
				email,
				nsipProjectLink: nsipProjectLink(req.session.appData)
			});
		}
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = {
	getConfirmation
};
