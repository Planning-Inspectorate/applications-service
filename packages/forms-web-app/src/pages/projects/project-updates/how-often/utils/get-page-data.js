const { projectUpdatesRoutes } = require('../../_utils/project-updates-routes');
const { inputNameId } = require('../config');
const { getTitles } = require('./get-titles');

const getPageData = (view = 'index') => ({
	...getTitles(view),
	backLinkUrl: view === 'index' ? projectUpdatesRoutes.email : null,
	displayContent: view,
	inputNameId
});

module.exports = { getPageData };
