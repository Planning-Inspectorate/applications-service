const { VIEW } = require('../../../../../lib/views');

const view = 'projects/register/agent/their-address/view.njk';

const getRegisterAgentTheirAddressController = (req, res) => {
	return res.render(view, {
		address: req.session.behalfRegdata.representee.address
	});
};
const postRegisterAgentTheirAddressController = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;
	if (Object.keys(errors).length > 0) {
		return res.render(view, {
			errors,
			errorSummary,
			address: body
		});
	}

	req.session.behalfRegdata.representee.address.line1 = body.line1;
	req.session.behalfRegdata.representee.address.line2 = body.line2;
	req.session.behalfRegdata.representee.address.line3 = body.line3;
	req.session.behalfRegdata.representee.address.postcode = body.postcode;
	req.session.behalfRegdata.representee.address.country = body.country;

	const redirectUrl =
		req.query.mode === 'edit'
			? VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS
			: VIEW.REGISTER.AGENT.REPRESENTEE_EMAIL;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};

module.exports = {
	getRegisterAgentTheirAddressController,
	postRegisterAgentTheirAddressController
};
