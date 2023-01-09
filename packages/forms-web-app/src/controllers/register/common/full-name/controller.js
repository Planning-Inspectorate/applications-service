const { VIEW } = require('../../../../lib/views');
const { getKeyFromUrl, keyMap } = require('../helpers');
const { sanitiseFormPostResponse } = require('../../../../utils/sanitise-form-post');
const { getRedirectUrl } = require('./get-redirect-url');

const get = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const mappy = keyMap(key);

		const fullName = mappy.getSession(session)['full-name'];

		return res.render(VIEW.REGISTER[mappy.upperCaseKey].FULL_NAME, {
			fullName
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};
const post = (req, res) => {
	const { session } = req;
	const key = getKeyFromUrl(req.originalUrl);
	const mappy = keyMap(key);

	const { body, query } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(true, `/${VIEW.REGISTER[mappy.upperCaseKey].FULL_NAME}`)
			);
		}

		return res.render(VIEW.REGISTER[mappy.upperCaseKey].FULL_NAME, {
			errors,
			errorSummary
		});
	}

	mappy.setSession(session, 'full-name', body['full-name']);

	const redirectUrl = getRedirectUrl(query, key, mappy);

	if (originIsSanitiseFormPost) return res.send(new sanitiseFormPostResponse(false, redirectUrl));
	else return res.redirect(redirectUrl);
};

module.exports = {
	get,
	post
};
