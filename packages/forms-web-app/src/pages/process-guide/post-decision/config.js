const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const postDecisionRoute = 'what-happens-after-the-decision-is-made';

const postDecisionURL = getProcessGuidePageURL(postDecisionRoute);

const postDecisionI18nNamespace = 'postDecision';

module.exports = {
	postDecisionRoute,
	postDecisionURL,
	postDecisionI18nNamespace
};
