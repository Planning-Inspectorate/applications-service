const {
	featureFlag: { usePrivateBetaV1RoutesOnly }
} = require('../../../config');
const { mapTitles } = require('../../_utils/map-titles');
const { haveYourSayGuideSubdirectory } = require('../../have-your-say-guide/config');
const { processGuideSubdirectory } = require('../../process-guide/config');
const { projectSearchRoute } = require('../../project-search/config');

const getPageData = () => {
	return {
		homePageUrls: {
			haveYourSayGuide: haveYourSayGuideSubdirectory,
			processGuide: processGuideSubdirectory,
			projectSearch: projectSearchRoute
		},
		...mapTitles('Welcome to National Infrastructure Planning'),
		headerTitle: 'National Infrastructure Projects',
		showProjectSearchUrl: !usePrivateBetaV1RoutesOnly
	};
};

module.exports = {
	getPageData
};
