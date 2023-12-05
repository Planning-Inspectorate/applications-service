const logger = require('../../../../../lib/logger');
const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getSession, setSession } = require('../../../../../controllers/register/common/session');
const { addressToObj } = require('./_utils/addressHandler');
const { getRedirectUrl } = require('./_utils/get-redirect-url');
const { viewModel } = require('./_utils/viewModel');

const view = 'projects/register/_common/address/view.njk';
const addressKey = 'address';

const getRegisterAddressController = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);

		const address = getSession(session, key)[addressKey];

		return res.render(view, {
			...viewModel[key],
			address
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

const postRegisterAddressController = (req, res) => {
	try {
		const { body, query, originalUrl, session } = req;
		const key = getKeyFromUrl(originalUrl);

		const { errors = {}, errorSummary = [] } = body;
		if (Object.keys(errors).length > 0) {
			return res.render(view, {
				errors,
				errorSummary,
				...viewModel[key],
				address: addressToObj(body)
			});
		}

		setSession(session, key, addressKey, addressToObj(body));

		return res.redirect(`${res.locals.baseUrl}${getRedirectUrl(query, key)}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getRegisterAddressController,
	postRegisterAddressController
};
