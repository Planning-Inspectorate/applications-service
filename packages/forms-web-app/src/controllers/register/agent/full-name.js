const { VIEW } = require('../../../lib/views');

exports.getFullName = async (req, res) => {
	res.render(VIEW.REGISTER.AGENT.FULL_NAME, {
		fullName: req.session.behalfRegdata.representor['full-name']
	});
};

exports.postFullName = async (req, res) => {
	const { body } = req;

	const { errors = {}, errorSummary = [] } = body;
	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.FULL_NAME, {
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representor['full-name'] = body['full-name'];
	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.AGENT.ORGANISATION_NAME}`);
	}
};
