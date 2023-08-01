const { getUpdatesRoutes } = require('../../_utils/get-updates-routes');
const { inputNameId } = require('../config');
const { getTitles } = require('./get-titles');

const getPageData = (view = 'index') => ({
	...getTitles(view),
	backLinkUrl: view === 'index' ? getUpdatesRoutes.email : null,
	displayContent: view,
	inputNameId
});

module.exports = { getPageData };
