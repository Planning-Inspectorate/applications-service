const { getRedirectURL } = require('./_utils/get-redirect-url');

const representingPersonNameView = 'projects/register/agent/representing-person-name/view.njk';
const representingOrganisationNameView =
	'projects/register/agent/representing-organisation-name/view.njk';
const representingHouseholdNameView =
	'projects/register/agent/representing-household-name/view.njk';

const getRegisterAgentRepresentingNameController = (req, res) => {
	const { representing } = req.session.behalfRegdata;

	let view = representingPersonNameView;

	if (representing === 'organisation') view = representingOrganisationNameView;
	else if (representing === 'family') view = representingHouseholdNameView;

	return res.render(view, {
		representing,
		fullName: req.session.behalfRegdata.representee['full-name']
	});
};

const postRegisterAgentRepresentingNameController = (req, res) => {
	const { body, session, params, query } = req;
	const { errors = {}, errorSummary = [] } = body;
	const { case_ref } = params;

	const { representing } = session.behalfRegdata;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		let view = representingPersonNameView;

		if (representing === 'organisation') view = representingOrganisationNameView;
		else if (representing === 'family') view = representingHouseholdNameView;

		return res.render(view, {
			representing,
			errors,
			errorSummary
		});
	}

	req.session.behalfRegdata.representee['full-name'] = body['full-name'];

	const redirectURL = getRedirectURL(session, case_ref, query);

	return res.redirect(redirectURL);
};

module.exports = {
	getRegisterAgentRepresentingNameController,
	postRegisterAgentRepresentingNameController
};
