const { VIEW } = require('../../../../../lib/views');
const registrationData = require('../../registering-for/_session/registration-data.json');

const view = 'projects/register/agent/representing-who/view.njk';

const getRegisterAgentRepresentingWhoController = (req, res) =>
	res.render(view, {
		representing: req.session.behalfRegdata.representing
	});

const postRegisterAgentRepresentingWhoController = (req, res) => {
	const { body } = req;
	const { representing } = body;
	const { errors = {}, errorSummary = [] } = body;
	if (errors.representing || Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary
		});
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
		redirectUrl = `/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_HOUSEHOLD}`;
	}

	return res.redirect(`${res.locals.baseUrl}${redirectUrl}`);
};

module.exports = {
	getRegisterAgentRepresentingWhoController,
	postRegisterAgentRepresentingWhoController
};
