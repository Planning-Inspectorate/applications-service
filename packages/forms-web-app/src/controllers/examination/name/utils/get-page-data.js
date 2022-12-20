const { getBackLinkUrl } = require('./get-back-link-url');
const getPageData = (session, query) => {
	const { id, pageTitle, title, view } = session.currentView;
	return {
		backLinkUrl: getBackLinkUrl(query),
		id,
		pageTitle,
		title,
		view
	};
};

module.exports = {
	getPageData
};
