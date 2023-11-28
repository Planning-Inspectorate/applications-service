const { VIEW } = require('../../../../lib/views');
const registrationData = require('../../../../lib/registration-data.json');
const { REGISTER } = require('../../../../constants');
const { registeringForOptions } = require('./_validators/validate-registering-for-options');
const { projectsRouteParam } = require('../../config');
const { getPageData } = require('./_utils/get-page-data');

const view = 'projects/register/registering-for/view.njk';

const forwardPage = (partyType) => {
	const party = {
		[REGISTER.TYPE_OF_PARTY.MY_SAY]: VIEW.REGISTER.MYSELF.FULL_NAME,
		[REGISTER.TYPE_OF_PARTY.ORGANISATION]: VIEW.REGISTER.ORGANISATION.FULL_NAME,
		[REGISTER.TYPE_OF_PARTY.AGENT]: VIEW.REGISTER.AGENT.FULL_NAME,
		default: VIEW.REGISTER.TYPE_OF_PARTY
	};
	return party[partyType] || party.default;
};

const getRegisteringForController = (req, res) => {
	const referrer = req.get('Referrer');
	const { params, query, session } = req;
	const { typeOfParty } = session;

	const caseRef = params[projectsRouteParam];

	return res.render(view, getPageData(referrer, caseRef, query, typeOfParty));
};

const postRegisteringForController = (req, res) => {
	const referrer = req.get('Referrer');
	const { body, params, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	const caseRef = params[projectsRouteParam];

	const typeOfParty = body['type-of-party'];

	let selectedParty = null;

	if (registeringForOptions.includes(typeOfParty)) {
		selectedParty = typeOfParty;
	}

	if (Object.keys(errors).length > 0) {
		return res.render(view, {
			...getPageData(referrer, caseRef, query, selectedParty),
			errors,
			errorSummary
		});
	}

	let redirectUrl = `/${forwardPage(selectedParty)}`;
	if (typeOfParty !== req.session.typeOfParty) {
		req.session.typeOfParty = typeOfParty;
		if (typeOfParty === 'myself') {
			req.session.mySelfRegdata = registrationData.myself;
		} else if (typeOfParty === 'organisation') {
			req.session.orgRegdata = registrationData.org;
		} else if (typeOfParty === 'behalf') {
			req.session.behalfRegdata = registrationData.behalf;
		}
	} else if (req.query.mode === 'edit') {
		if (typeOfParty === 'myself') {
			redirectUrl = `/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`;
		} else if (typeOfParty === 'organisation') {
			redirectUrl = `/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`;
		} else if (typeOfParty === 'behalf') {
			redirectUrl = `/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`;
		}
	}

	return res.redirect(`${res.locals.baseUrl}${redirectUrl}`);
};

module.exports = { getRegisteringForController, postRegisteringForController, forwardPage };
