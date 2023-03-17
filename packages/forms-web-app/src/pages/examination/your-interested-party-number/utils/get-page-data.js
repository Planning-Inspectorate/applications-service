const { getBackLinkUrl } = require('./get-back-link-url');

const {
	routesConfig: {
		examination: {
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session, query) => {
	return {
		id: yourInterestedPartyNumber.id,
		backLinkUrl: getBackLinkUrl(query),
		pageTitle: yourInterestedPartyNumber.name,
		title: yourInterestedPartyNumber.name
	};
};

module.exports = {
	getPageData
};
