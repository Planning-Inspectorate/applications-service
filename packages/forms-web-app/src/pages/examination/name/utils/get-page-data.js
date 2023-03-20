const { getBackLinkUrl } = require('./get-back-link-url');

const {
	routesConfig: {
		examination: {
			pages: { nameMyself }
		}
	}
} = require('../../../../routes/config');

const getPageData = (session, query) => {
	const { id, pageTitle, title } = session.currentView;
	return {
		backLinkUrl: getBackLinkUrl(query),
		id,
		pageTitle,
		title,
		view: 'examination/name/view.njk',
		url: nameMyself.route
	};
};

module.exports = {
	getPageData
};
