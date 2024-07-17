const { getBackLinkUrl } = require('./get-back-link-url');
const { getDeadlineItemOptions } = require('./get-deadline-item-options');

const {
	routesConfig: {
		examination: {
			pages: { selectDeadline }
		}
	}
} = require('../../../../routes/config');

const getPageData = (i18n, query, session) => ({
	backLinkUrl: getBackLinkUrl(query, session),
	id: selectDeadline.id,
	options: getDeadlineItemOptions(i18n, session)
});

module.exports = { getPageData };
