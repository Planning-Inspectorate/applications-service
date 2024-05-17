const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const takingPartRoute = 'taking-part-pre-application';

const takingPartURL = getHaveYourSayGuidePageURL(takingPartRoute);

const takingPartI18nNamespace = 'haveYourSayGuideTakingPart';

module.exports = {
	takingPartURL,
	takingPartI18nNamespace
};
