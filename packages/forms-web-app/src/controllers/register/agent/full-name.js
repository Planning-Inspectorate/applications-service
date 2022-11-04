const { VIEW } = require('../../../lib/views');
const { sanitiseFormPostResponse } = require('../../../utils/sanitise-form-post.js');

exports.getFullName = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.FULL_NAME, {
		fullName: req.session.behalfRegdata.representor['full-name']
	});
};

exports.postFullName = (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [], origin } = body;
	const originIsSanitiseFormPost = origin === 'sanitise-form-post';

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(true, `/${VIEW.REGISTER.AGENT.FULL_NAME}`));
		}

		res.render(VIEW.REGISTER.AGENT.FULL_NAME, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representor['full-name'] = body['full-name'];
	if (req.query.mode === 'edit') {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`)
			);
		}

		res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
	} else {
		if (originIsSanitiseFormPost) {
			return res.send(
				new sanitiseFormPostResponse(false, `/${VIEW.REGISTER.AGENT.ORGANISATION_NAME}`)
			);
		}

		res.redirect(`/${VIEW.REGISTER.AGENT.ORGANISATION_NAME}`);
	}
};
