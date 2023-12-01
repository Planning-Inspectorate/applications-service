const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const { mapTitles } = require('../../_utils/map-titles');

const getPageData = () => ({
	...mapTitles('Detailed information'),
	headerTitle: 'National Infrastructure Projects',
	detailedInformationUrls: {
		haveYourSayGuide: haveYourSayGuideSubdirectory,
		processGuide: processGuideSubdirectory
	}
});

module.exports = {
	getPageData
};
