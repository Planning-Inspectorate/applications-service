const { getPageData } = require('./_utils/get-page-data');
const { getRegisteringForRedirectURL } = require('./_utils/get-registering-for-redirect-url');
const { setRegisteringForSession } = require('./_utils/set-registering-for-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const { isSelectedRegisteringForOptionNew } = require('./_utils/helpers');

const view = 'projects/register/registering-for/view.njk';

const getRegisteringForController = (req, res) => {
	const { session } = req;
	const { typeOfParty } = session;

	return res.render(view, getPageData(typeOfParty));
};

const postRegisteringForController = (req, res) => {
	const { body, session, params, query } = req;
	const { errors = {}, errorSummary = [] } = body;
	const { case_ref } = params;

	const selectedParty = body['type-of-party'];

	if (Object.keys(errors).length > 0) {
		return res.render(view, {
			...getPageData(selectedParty),
			errors,
			errorSummary
		});
	}

	const { nextURL, editURL } = getRegisteringForRedirectURL(case_ref, selectedParty);

	let redirectURL = nextURL;

	if (isSelectedRegisteringForOptionNew(selectedParty, session.typeOfParty))
		setRegisteringForSession(session, selectedParty);
	else if (isQueryModeEdit(query)) redirectURL = editURL;

	return res.redirect(redirectURL);
};

module.exports = { getRegisteringForController, postRegisteringForController };
