const { getContactURL } = require('../../contact/_utils/get-contact-url');
const {
	getDetailedInformationURL
} = require('../../detailed-information/_utils/get-detailed-information-url');
const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const { projectSearchRoute } = require('../../project-search/config');

const getPageData = () => {
	return {
		homePageUrls: {
			haveYourSayGuide: haveYourSayGuideSubdirectory,
			processGuide: processGuideSubdirectory,
			projectSearch: projectSearchRoute,
			contactURL: getContactURL(),
			detailedInformationURL: getDetailedInformationURL()
		}
	};
};

module.exports = {
	getPageData
};
