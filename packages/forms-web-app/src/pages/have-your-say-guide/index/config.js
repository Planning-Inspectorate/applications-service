const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const haveYourSayGuideURL = getHaveYourSayGuidePageURL();

/* /index being used for e2e tests */
const haveYourSayGuideIndexURL = getHaveYourSayGuidePageURL('index');

const haveYourSayGuideTitle = 'Have your say about a national infrastructure project';

module.exports = { haveYourSayGuideURL, haveYourSayGuideIndexURL, haveYourSayGuideTitle };
