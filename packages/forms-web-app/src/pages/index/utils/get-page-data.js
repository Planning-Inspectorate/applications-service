const { mapTitles } = require('../../_utils/map-titles');
const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');

const getPageData = () => ({
	homePageUrls: {
		haveYourSayGuide: haveYourSayGuideSubdirectory,
		processGuide: processGuideSubdirectory
	},
	...mapTitles('Welcome to National Infrastructure Planning'),
	headerTitle: 'National Infrastructure Projects'
});

module.exports = {
	getPageData
};
