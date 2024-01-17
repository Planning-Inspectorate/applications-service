const { VIEW } = require('../../../../../../lib/views');

const representingPersonNameView = 'projects/register/agent/representing-person-name/view.njk';
const representingOrganisationNameView =
	'projects/register/agent/representing-organisation-name/view.njk';
const representingFamilyNameView = 'projects/register/agent/representing-family-name/view.njk';

const getRegisterAgentRepresentingNameController = (req, res) => {
	const { representing } = req.session.behalfRegdata;

	let view = representingPersonNameView;

	if (representing === 'organisation') view = representingOrganisationNameView;
	else if (representing === 'family') view = representingFamilyNameView;

	return res.render(view, {
		representing,
		fullName: req.session.behalfRegdata.representee['full-name']
	});
};

const postRegisterAgentRepresentingNameController = (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;

	const { representing } = req.session.behalfRegdata;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		let view = representingPersonNameView;

		if (representing === 'organisation') view = representingOrganisationNameView;
		else if (representing === 'family') view = representingFamilyNameView;

		return res.render(view, {
			representing,
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representee['full-name'] = body['full-name'];

	let redirectUrl = '';

	if (req.query.mode === 'edit') redirectUrl = VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS;
	else if (representing === 'organisation') redirectUrl = VIEW.REGISTER.AGENT.REPRESENTEE_ADDRESS;
	else redirectUrl = VIEW.REGISTER.AGENT.REPRESENTEE_OVER_18;

	return res.redirect(`${res.locals.baseUrl}/${redirectUrl}`);
};

module.exports = {
	getRegisterAgentRepresentingNameController,
	postRegisterAgentRepresentingNameController
};
