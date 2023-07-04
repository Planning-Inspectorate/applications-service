const { VIEW } = require('../../../lib/views');
const registrationData = require('../../../lib/registration-data.json');

exports.getRepresentingFor = (req, res) => {
	res.render(VIEW.REGISTER.AGENT.REPRESENTING_FOR, {
		representing: req.session.behalfRegdata.representing
	});
};

exports.postRepresentingFor = (req, res) => {
	const { body } = req;
	const { representing } = body;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.representing || Object.keys(errors).length > 0) {
		res.render(VIEW.REGISTER.AGENT.REPRESENTING_FOR, {
			errors,
			errorSummary
		});
		return;
	}
	// const oldRepresenting = req.session.behalfRegdata.representing;
	const representingChanged = req.session.behalfRegdata.representing !== representing;
	if (!representingChanged && req.query.mode === 'edit') {
		return res.redirect(`${res.locals.baseUrl}/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
	} else if (req.query.mode === 'edit') {
		req.session.behalfRegdata.representee = registrationData.behalf.representee;
		delete req.session.comment;
	}
	req.session.behalfRegdata.representing = representing;
	let redirectUrl = '';
	if (representing === 'person') {
		redirectUrl = `/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}`;
	} else if (representing === 'organisation') {
		redirectUrl = `/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION}`;
	} else if (representing === 'family') {
		redirectUrl = `/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY}`;
	}

	return res.redirect(`${res.locals.baseUrl}${redirectUrl}`);
};
