const { getBackLinkUrl } = require('./get-back-link-url');
const { getDeadlineDetailsNameOrDefault } = require('../../_session/deadline');
const { getTitles } = require('./get-titles');

const getPageData = (i18n, session, query) => {
	const { id, route } = session.currentView;
	return {
		...getTitles(i18n, route),
		backLinkUrl: getBackLinkUrl(query),
		id,
		name: getDeadlineDetailsNameOrDefault(session)
	};
};

module.exports = {
	getPageData
};
