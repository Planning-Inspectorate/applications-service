const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const getInvolvedRoute = 'get-involved-preliminary-meeting';

const getInvolvedURL = getHaveYourSayGuidePageURL(getInvolvedRoute);

const getInvolvedI18nNamespace = 'haveYourSayGuideGetInvolved';

module.exports = {
	getInvolvedURL,
	getInvolvedI18nNamespace
};
