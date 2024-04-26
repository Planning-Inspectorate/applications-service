const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const {
	getRegisterOfAdviceIndexURL
} = require('../../register-of-advice/index/_utils/get-register-of-advice-index-url');

const getPageData = () => ({
	detailedInformationUrls: {
		haveYourSayGuide: haveYourSayGuideSubdirectory,
		processGuide: processGuideSubdirectory,
		registerOfAdviceIndexURL: getRegisterOfAdviceIndexURL()
	}
});

module.exports = {
	getPageData
};
