const { VIEW } = require('../../../lib/views');

function sanitiseFormPostResponse(error, url) {
	this.error = error;
	this.url = url;
}

exports.getRole = (req, res) => {
	res.render(VIEW.REGISTER.ORGANISATION.ROLE, { role: req.session.orgRegdata.role });
};

exports.postRole = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors.role || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(true, `/${VIEW.REGISTER.ORGANISATION.ROLE}`));
		}

		res.render(VIEW.REGISTER.ORGANISATION.ROLE, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.orgRegdata.role = body.role;

	if (req.query.mode === 'edit') {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`)
			);
		}

		res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
	} else {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.ORGANISATION.EMAIL}`));
		}

		res.redirect(`/${VIEW.REGISTER.ORGANISATION.EMAIL}`);
	}
};
