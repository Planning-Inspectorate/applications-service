const { getKeyFromUrl, keyMap } = require('../helpers');
const { VIEW } = require('../../../../lib/views');
const { getRedirectUrl } = require('./get-redirect-url');
const get = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		const mappy = keyMap(key);

		return res.render(VIEW.REGISTER[mappy.upperCaseKey][mappy.viewKey.email], {
			email: req.session[mappy.sessionKey].email
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};

const post = (req, res) => {
	const { body, query } = req;
	const key = getKeyFromUrl(req.originalUrl);
	const mappy = keyMap(key);
	const { errors = {}, errorSummary = [] } = body;
	if (errors.email || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER[mappy.upperCaseKey][mappy.viewKey.email], {
			errors,
			errorSummary
		});
		return;
	}

	console.log('HERE i am ', key, getRedirectUrl(query, key, mappy));

	req.session[mappy.sessionKey].email = body.email;

	return res.redirect(getRedirectUrl(query, key, mappy));
};

module.exports = {
	get,
	post
};
