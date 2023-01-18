const { getBackLinkUrl } = require('./get-back-link-url');
const { getSubmittingForOptions } = require('./get-submitting-for-options');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../routes/config');

const getPageData = (query, session) => ({
	backLinkUrl: getBackLinkUrl(query, session),
	id: submittingFor.id,
	options: getSubmittingForOptions(session),
	pageTitle: submittingFor.name,
	title: submittingFor.name
});

module.exports = { getPageData };
