const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const preApplicationRoute = 'pre-application';

const preApplicationURL = getProcessGuidePageURL(preApplicationRoute);

const preApplicationI18nNamespace = 'preApplication';

module.exports = {
	preApplicationRoute,
	preApplicationURL,
	preApplicationI18nNamespace
};
