const { VIEW } = require('../../../lib/views');

exports.getFullName = (req, res) => {
	let view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME;
	const { representing } = req.session.behalfRegdata;
	if (representing === 'person') {
		view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME;
	} else if (representing === 'organisation') {
		view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION;
	} else if (representing === 'family') {
		view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY;
	}

	res.render(view, {
		representing,
		fullName: req.session.behalfRegdata.representee['full-name']
	});
};

exports.postFullName = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;

	let view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME;
	const { representing } = req.session.behalfRegdata;
	if (representing === 'person') view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME;
	else if (representing === 'organisation')
		view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION;
	else if (representing === 'family') view = VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(view, {
			representing,
			errors,
			errorSummary
		});
		return;
	}

	req.session.behalfRegdata.representee['full-name'] = body['full-name'];
	if (req.query.mode === 'edit') {
		res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
	} else if (representing === 'organisation') {
		res.redirect(`/${VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS}`);
	} else {
		res.redirect(`/${VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18}`);
	}
};
