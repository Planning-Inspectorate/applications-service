const config = require('../../../config');
const { getContactURL } = require('../../contact/_utils/get-contact-url');
const {
	getDetailedInformationURL
} = require('../../detailed-information/_utils/get-detailed-information-url');
const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const { projectSearchRoute } = require('../../project-search/config');
const { projectsMapRoute } = require('../../projects-map/config');

const getPageData = (locale = 'en') => {
	return {
		homePageUrls: {
			haveYourSayGuideURL: haveYourSayGuideSubdirectory,
			processGuideURL: processGuideSubdirectory,
			projectSearchURL: projectSearchRoute,
			projectsMapURL: projectsMapRoute,
			contactURL: getContactURL(),
			detailedInformationURL: getDetailedInformationURL(),
			nsipNewsURL: config.govUK.nsipNews,
			developmentConsentURL:
				locale === 'cy' ? config.govUK.developmentConsentWelsh : config.govUK.developmentConsent
		}
	};
};

module.exports = {
	getPageData
};
