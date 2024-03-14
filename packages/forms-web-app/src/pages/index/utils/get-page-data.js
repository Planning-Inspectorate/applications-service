const {
	featureFlag: { usePrivateBetaV1RoutesOnly }
} = require('../../../config');
const { mapTitles } = require('../../_utils/map-titles');
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
		},
		...mapTitles('Welcome to Find a National Infrastructure Project'),
		showProjectSearchUrl: !usePrivateBetaV1RoutesOnly
	};
};

module.exports = {
	getPageData
};
