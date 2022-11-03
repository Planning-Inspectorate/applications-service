const { VIEW } = require('../../../lib/views');

function sanitiseFormPostResponse(error, url) {
	this.error = error;
	this.url = url;
}

exports.getFullName = (req, res) => {
	res.render(VIEW.REGISTER.MYSELF.FULL_NAME, { fullName: req.session.mySelfRegdata['full-name'] });
};

exports.postFullName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(true, `/${VIEW.REGISTER.MYSELF.FULL_NAME}`));
		}

		return res.render(VIEW.REGISTER.MYSELF.FULL_NAME, {
			errors,
			errorSummary
		});
	}

	req.session.mySelfRegdata['full-name'] = body['full-name'];

	if (req.query.mode === 'edit') {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`)
			);
		}

		return res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
	} else {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.MYSELF.OVER_18}`));
		}

		return res.redirect(`/${VIEW.REGISTER.MYSELF.OVER_18}`);
	}
};
