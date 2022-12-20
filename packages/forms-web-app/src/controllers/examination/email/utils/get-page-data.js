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
		backLinkUrl: getBackLink(session, query),
		pageTitle: email.name,
		title: email.name,
		hint: "We'll use your email address to confirm we've received your submission. We will not publish your email address."
	};
};

module.exports = {
	getPageData
};
