const { getUpdatesEmailURL } = require('../../email/utils/get-updates-email-url');
const { inputNameId } = require('../config');
const { getTitles } = require('./get-titles');

const getPageData = (view = 'index', caseRef, i18n) => ({
	...getTitles(view, i18n),
	backLinkUrl: view === 'index' ? getUpdatesEmailURL(caseRef) : null,
	displayContent: view,
	inputNameId
});

module.exports = { getPageData };
