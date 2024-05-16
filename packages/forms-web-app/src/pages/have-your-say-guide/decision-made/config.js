const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const decisionMadeRoute = 'what-happens-after-decision';

const decisionMadeURL = getHaveYourSayGuidePageURL(decisionMadeRoute);

const decisionMadeI18nNamespace = 'decisionMade';

module.exports = {
	decisionMadeURL,
	decisionMadeI18nNamespace
};
