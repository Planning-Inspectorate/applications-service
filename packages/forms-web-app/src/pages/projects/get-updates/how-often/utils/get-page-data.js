const { getUpdatesEmailURL } = require('../../email/utils/get-updates-email-url');
const { inputNameId } = require('../config');
const { getTitles } = require('./get-titles');

const getPageData = (view = 'index', caseRef) => ({
	...getTitles(view),
	backLinkUrl: view === 'index' ? getUpdatesEmailURL(caseRef) : null,
	displayContent: view,
	inputNameId
});

module.exports = { getPageData };
