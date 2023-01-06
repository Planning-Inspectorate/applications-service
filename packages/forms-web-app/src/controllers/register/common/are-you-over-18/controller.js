const { VIEW } = require('../../../../lib/views');
const { getKeyFromUrl, keyMap } = require('../helpers');
const { getRedirectUrl } = require('./get-redirect-url');
const get = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		const mappy = keyMap(key);

		return res.render(VIEW.REGISTER[mappy.upperCaseKey].OVER_18, {
			over18: req.session[mappy.sessionKey]['over-18']
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};

const post = (req, res) => {
	const key = getKeyFromUrl(req.originalUrl);
	const mappy = keyMap(key);

	const { body, query } = req;
	const over18 = body['over-18'];
	const { errors = {}, errorSummary = [] } = body;
	if (errors['over-18'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER[mappy.upperCaseKey].OVER_18, {
			errors,
			errorSummary
		});
		return;
	}

	req.session[mappy.sessionKey]['over-18'] = over18;

	return res.redirect(getRedirectUrl(query, key, mappy));
};

module.exports = {
	get,
	post
};
