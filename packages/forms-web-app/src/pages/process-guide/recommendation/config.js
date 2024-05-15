const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const recommendationRoute = 'recommendation';

const recommendationURL = getProcessGuidePageURL(recommendationRoute);

const recommendationI18nNamespace = 'recommendation';

module.exports = {
	recommendationRoute,
	recommendationURL,
	recommendationI18nNamespace
};
