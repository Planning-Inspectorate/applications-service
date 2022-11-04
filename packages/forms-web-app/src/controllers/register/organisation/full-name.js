const { VIEW } = require('../../../lib/views');

function sanitiseFormPostResponse(error, url) {
	this.error = error;
	this.url = url;
}

exports.getFullName = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.FULL_NAME, {
		fullName: req.session.orgRegdata['full-name']
	});
};

exports.postFullName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(true, `/${VIEW.REGISTER.ORGANISATION.FULL_NAME}`)
			);
		}

		res.render(VIEW.REGISTER.ORGANISATION.FULL_NAME, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata['full-name'] = body['full-name'];
	if (req.query.mode === 'edit') {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`)
			);
		}

		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.ORGANISATION.OVER_18}`)
			);
		}

		res.redirect(`/${VIEW.REGISTER.ORGANISATION.OVER_18}`);
	}
};
