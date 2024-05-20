const config = require('../../../config');
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
			haveYourSayGuideURL: haveYourSayGuideSubdirectory,
			processGuideURL: processGuideSubdirectory,
			projectSearchURL: projectSearchRoute,
			contactURL: getContactURL(),
			detailedInformationURL: getDetailedInformationURL(),
			nsipNewsURL: config.govUK.nsipNews
		}
	};
};

module.exports = {
	getPageData
};
