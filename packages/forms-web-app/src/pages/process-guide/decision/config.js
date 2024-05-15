const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const decisionRoute = 'decision';

const decisionURL = getProcessGuidePageURL(decisionRoute);

const decisionI18nNamespace = 'decision';

module.exports = {
	decisionRoute,
	decisionURL,
	decisionI18nNamespace
};
