const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const acceptanceRoute = 'review-of-the-application';

const acceptanceURL = getProcessGuidePageURL(acceptanceRoute);

const acceptanceI18nNamespace = 'acceptance';

module.exports = {
	acceptanceRoute,
	acceptanceURL,
	acceptanceI18nNamespace
};
