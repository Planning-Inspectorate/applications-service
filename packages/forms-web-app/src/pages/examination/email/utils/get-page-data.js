const { getBackLink } = require('./get-back-link');

const {
	routesConfig: {
		examination: {
			pages: { email }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session, query) => {
	return {
		id: email.id,
		backLinkUrl: getBackLink(session, query)
	};
};

module.exports = {
	getPageData
};
