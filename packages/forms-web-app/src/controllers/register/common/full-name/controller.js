const {
	VIEW: {
		REGISTER: {
			COMMON: { EMAIL_VIEW }
		}
	}
} = require('../../../../lib/views');
const { getKeyFromUrl, getObjectHandler } = require('../helpers');
const { sanitiseFormPostResponse } = require('../../../../utils/sanitise-form-post');
const { getRedirectUrl } = require('./get-redirect-url');
const { viewModel } = require('./viewModel');

const get = (req, res) => {
	try {
		const { session } = req;
		const key = getKeyFromUrl(req.originalUrl);
		const refObject = getObjectHandler(key);

		const fullName = refObject.getSession(session)['full-name'];
		return res.render(EMAIL_VIEW, {
			...viewModel[refObject.key],
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

	const { body, query } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(true, EMAIL_VIEW));
		}

		return res.render(EMAIL_VIEW, {
			errors,
			errorSummary
		});
	}

	const refObject = getObjectHandler(key);
	refObject.setSession(session, 'full-name', body['full-name']);
	const redirectUrl = getRedirectUrl(query, key, refObject);

	if (originIsSanitiseFormPost) return res.send(new sanitiseFormPostResponse(false, redirectUrl));
	else return res.redirect(redirectUrl);
};

module.exports = {
	get,
	post
};
