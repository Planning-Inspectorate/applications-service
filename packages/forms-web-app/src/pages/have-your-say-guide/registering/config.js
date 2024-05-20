const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const registeringRoute = 'registering-have-your-say';

const registeringURL = getHaveYourSayGuidePageURL(registeringRoute);

const registeringI18nNamespace = 'haveYourSayGuideRegistering';

module.exports = {
	registeringURL,
	registeringI18nNamespace
};
