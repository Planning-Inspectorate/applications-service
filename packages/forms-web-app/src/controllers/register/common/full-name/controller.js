const { VIEW } = require('../../../../lib/views');
const { getKeyFromUrl, keyMap } = require('../helpers');
const { sanitiseFormPostResponse } = require('../../../../utils/sanitise-form-post');

const get = (req, res) => {
	try {
		const key = getKeyFromUrl(req.originalUrl);
		const mappy = keyMap(key);

		return res.render(VIEW.REGISTER[mappy.upperCaseKey].FULL_NAME, {
			fullName: req.session[mappy.sessionKey]['full-name']
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};
const post = (req, res) => {
	const key = getKeyFromUrl(req.originalUrl);
	const mappy = keyMap(key);

	const { body } = req;

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

	req.session[mappy.sessionKey]['full-name'] = body['full-name'];

	if (req.query.mode === 'edit') {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(
					false,
					`/${VIEW.REGISTER[mappy.upperCaseKey].CHECK_YOUR_ANSWERS}`
				)
			);
		}

		return res.redirect(`/${VIEW.REGISTER[mappy.upperCaseKey].CHECK_YOUR_ANSWERS}`);
	} else {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER[mappy.upperCaseKey].OVER_18}`)
			);
		}

		return res.redirect(`/${VIEW.REGISTER[mappy.upperCaseKey].OVER_18}`);
	}
};

module.exports = {
	get,
	post
};
