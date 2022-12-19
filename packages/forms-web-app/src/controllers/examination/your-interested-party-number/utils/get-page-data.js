const { getBackLink } = require('./get-back-link');

const {
	routesConfig: {
		examination: {
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session, query) => {
	const interestedPartyNumber = session.examination.interestedPartyNumber || '';

	return {
		id: yourInterestedPartyNumber.id,
		backLinkUrl: getBackLink(query),
		interestedPartyNumber,
		pageTitle: yourInterestedPartyNumber.name,
		title: yourInterestedPartyNumber.name
	};
};

module.exports = {
	getPageData
};
