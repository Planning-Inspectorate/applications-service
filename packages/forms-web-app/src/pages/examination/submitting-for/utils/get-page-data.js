const { getBackLinkUrl } = require('./get-back-link-url');
const { formatSubmittingForOptions } = require('./format-submitting-for-options');
const { getDeadlineDetailsInterestedPartyNumberOrDefault } = require('../../_session/deadline');

const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../routes/config');

const getPageData = (i18n, query, session) => ({
	backLinkUrl: getBackLinkUrl(query, session),
	id: submittingFor.id,
	interestedPartyNumber: getDeadlineDetailsInterestedPartyNumberOrDefault(session),
	options: formatSubmittingForOptions(i18n, session)
});

module.exports = { getPageData };
