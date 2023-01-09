const {
	routesConfig: {
		examination: {
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../routes/config');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const {
	setDeadlineDetailsInterestedPartyNumber,
	setDeadlineDetailsApplicant
} = require('../session/deadline');
const { getDeadlineDetailsInterestedPartyNumberOrDefault } = require('../session/deadline/');

const getYourInterestedPartyNumber = (req, res) => {
	try {
		const { session, query } = req;
		const pageData = getPageData(session, query);

		pageData.interestedPartyNumber = getDeadlineDetailsInterestedPartyNumberOrDefault(session);

		return res.render(yourInterestedPartyNumber.view, pageData);
	} catch {
		return res.status(500).render('error/unhandled-exception');
	}
};

const postYourInterestedPartyNumber = (req, res) => {
	try {
		const { session = {}, query } = req;

		const { body } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[yourInterestedPartyNumber.id] || Object.keys(errors).length > 0) {
			return res.render(yourInterestedPartyNumber.view, {
				id: yourInterestedPartyNumber.id,
				errors,
				errorSummary,
				...getPageData(session, query)
			});
		}

		const yourInterestedPartyNumberValue = body[yourInterestedPartyNumber.id];

		if (!yourInterestedPartyNumberValue) throw new Error('No interested party number');

		setDeadlineDetailsInterestedPartyNumber(session, yourInterestedPartyNumberValue);
		setDeadlineDetailsApplicant(session, '');

		return res.redirect(getRedirectUrl(query));
	} catch (e) {
		console.log(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
};
