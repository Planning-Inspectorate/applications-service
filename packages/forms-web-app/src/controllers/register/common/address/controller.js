const {
	VIEW: {
		REGISTER: {
			COMMON: { ADDRESS_VIEW }
		}
	}
} = require('../../../../lib/views');
const { getKeyFromUrl } = require('../get-key-from-url');
const { getSession, setSession } = require('../session');
const { viewModel } = require('./viewModel');
const { getRedirectUrl } = require('./get-redirect-url');
const { addressToObj } = require('./addressHandler');
const logger = require('../../../../lib/logger');

const addressKey = 'address';

const getAddress = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);

		const address = getSession(session, key)[addressKey];

		return res.render(ADDRESS_VIEW, {
			...viewModel[key],
			address
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};

const postAddress = (req, res) => {
	try {
		const { body, query, originalUrl, session } = req;
		const key = getKeyFromUrl(originalUrl);

		const { errors = {}, errorSummary = [] } = body;
		if (Object.keys(errors).length > 0) {
			res.render(ADDRESS_VIEW, {
				errors,
				errorSummary,
				...viewModel[key],
				address: addressToObj(body)
			});
			return;
		}

		setSession(session, key, addressKey, addressToObj(body));

		return res.redirect(getRedirectUrl(query, key));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getAddress,
	postAddress
};
