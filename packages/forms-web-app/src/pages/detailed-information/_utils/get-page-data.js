const { getGovUkUrls } = require('../../_utils/get-govuk-urls');
const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const {
	getRegisterOfAdviceIndexURL
} = require('../../register-of-advice/index/_utils/get-register-of-advice-index-url');

const getPageData = (locale = 'en') => ({
	detailedInformationUrls: {
		haveYourSayGuide: haveYourSayGuideSubdirectory,
		processGuide: processGuideSubdirectory,
		registerOfAdviceIndexURL: getRegisterOfAdviceIndexURL(),
		...getGovUkUrls(locale)
	}
});

module.exports = {
	getPageData
};
