const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const haveYourSayGuideURL = getHaveYourSayGuidePageURL();

/* /index being used for e2e tests */
const haveYourSayGuideIndexURL = getHaveYourSayGuidePageURL('index');

const haveYourSayGuideIndexI18nNamespace = 'haveYourSayGuideIndex';

module.exports = {
	haveYourSayGuideURL,
	haveYourSayGuideIndexURL,
	haveYourSayGuideIndexI18nNamespace
};
