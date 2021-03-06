const { VIEW } = require('../../lib/views');
const registrationData = require('../../lib/registration-data.json');
const { validTypeOfPartyOptions } = require('../../validators/register/type-of-party');
const { REGISTER } = require('../../constants');

exports.getTypeOfParty = async (req, res) => {
	res.render(VIEW.REGISTER.TYPE_OF_PARTY, { type: req.session.typeOfParty });
};

const forwardPage = (partyType) => {
	const party = {
		[REGISTER.TYPE_OF_PARTY.MY_SAY]: VIEW.REGISTER.MYSELF.FULL_NAME,
		[REGISTER.TYPE_OF_PARTY.ORGANISATION]: VIEW.REGISTER.ORGANISATION.FULL_NAME,
		[REGISTER.TYPE_OF_PARTY.AGENT]: VIEW.REGISTER.AGENT.FULL_NAME,
		default: VIEW.REGISTER.TYPE_OF_PARTY
	};
	return party[partyType] || party.default;
};

exports.forwardPage = forwardPage;

exports.postTypeOfParty = async (req, res) => {
	const { body } = req;
	const { errors = {}, errorSummary = [] } = body;

	const typeOfParty = body['type-of-party'];
	let selectedParty = null;

	if (validTypeOfPartyOptions.includes(typeOfParty)) {
		selectedParty = typeOfParty;
	}

	if (Object.keys(errors).length > 0) {
		res.render(forwardPage('default'), {
			type: selectedParty,
			errors,
			errorSummary
		});
		return;
	}
	if (typeOfParty !== req.session.typeOfParty) {
		req.session.typeOfParty = typeOfParty;
		if (typeOfParty === 'myself') {
			req.session.mySelfRegdata = registrationData.myself;
		} else if (typeOfParty === 'organisation') {
			req.session.orgRegdata = registrationData.org;
		} else if (typeOfParty === 'behalf') {
			req.session.behalfRegdata = registrationData.behalf;
		}
		res.redirect(`/${forwardPage(selectedParty)}`);
	} else if (req.query.mode === 'edit') {
		if (typeOfParty === 'myself') {
			res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
		} else if (typeOfParty === 'organisation') {
			res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
		} else if (typeOfParty === 'behalf') {
			res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
		}
	} else {
		res.redirect(`/${forwardPage(selectedParty)}`);
	}
};
