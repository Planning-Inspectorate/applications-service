const {
	VIEW: {
		REGISTER: {
			COMMON: { REGISTRATION_SAVED }
		}
	}
} = require('../../../../lib/views');
const logger = require('../../../../lib/logger');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSession } = require('../session');
const { viewModel } = require('./viewModel');

const getRegistrationSaved = (req, res) => {
	try {
		const { session } = req;
		const { ipRefNo } = session;
		const key = getKeyFromUrl(req.originalUrl);
		const email = getSession(session, key)['email'];

		return res.render(REGISTRATION_SAVED, { ipRefNo, email, ...viewModel[key] });
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = {
	getRegistrationSaved
};
