const { mapTitles } = require('../../_utils/map-titles');
const { processGuideTitle } = require('../config');

const getPageData = () => ({
	...mapTitles(processGuideTitle, processGuideTitle)
});

module.exports = { getPageData };
