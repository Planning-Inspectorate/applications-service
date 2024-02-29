const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const { mapTitles } = require('../../_utils/map-titles');
const {
	getRegisterOfAdviceIndexURL
} = require('../../register-of-advice/index/_utils/get-register-of-advice-index-url');

const getPageData = () => ({
	...mapTitles('Detailed information'),
	headerTitle: 'National Infrastructure Projects',
	detailedInformationUrls: {
		haveYourSayGuide: haveYourSayGuideSubdirectory,
		processGuide: processGuideSubdirectory,
		registerOfAdviceIndexURL: getRegisterOfAdviceIndexURL()
	}
});

module.exports = {
	getPageData
};
