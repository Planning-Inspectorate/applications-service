const { VIEW } = require('../../../../lib/views');
const { getKeyFromUrl, keyMap } = require('../helpers');
const { sanitiseFormPostResponse } = require('../../../../utils/sanitise-form-post');
const { getRedirectUrl } = require('./get-redirect-url');

const get = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		const mappy = keyMap(key);

		console.log('HERE', key, mappy);
		const fullName =
			key === 'agent'
				? req.session[mappy.sessionKey].representor['full-name']
				: req.session[mappy.sessionKey]['full-name'];

		console.log('Name = ', fullName);

		return res.render(VIEW.REGISTER[mappy.upperCaseKey].FULL_NAME, {
			fullName
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

	if (key === 'agent') req.session[mappy.sessionKey].representor['full-name'] = body['full-name'];
	else req.session[mappy.sessionKey]['full-name'] = body['full-name'];

	const redirectUrl = getRedirectUrl(query, key, mappy);

	console.log('Redit', redirectUrl);
	if (originIsSanitiseFormPost) return res.send(new sanitiseFormPostResponse(false, redirectUrl));
	else return res.redirect(redirectUrl);
};

module.exports = {
	get,
	post
};
