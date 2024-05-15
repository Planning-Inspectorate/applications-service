const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const decisionMadeRoute = 'what-happens-after-decision';

const decisionMadeURL = getHaveYourSayGuidePageURL(decisionMadeRoute);

module.exports = {
	decisionMadeURL
};
