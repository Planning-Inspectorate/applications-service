const { getBackLinkUrl } = require('./get-back-link-url');

const {
	routesConfig: {
		examination: {
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../routes/config');
const {
	getDeadlineDetailsInterestedPartyNumberOrDefault
} = require('../../session/deadline/details/interested-party-number');

const getPageData = (session, query) => {
	const interestedPartyNumber = getDeadlineDetailsInterestedPartyNumberOrDefault(session);

	return {
		id: yourInterestedPartyNumber.id,
		backLinkUrl: getBackLinkUrl(query),
		interestedPartyNumber,
		pageTitle: yourInterestedPartyNumber.name,
		title: yourInterestedPartyNumber.name
	};
};

module.exports = {
	getPageData
};
