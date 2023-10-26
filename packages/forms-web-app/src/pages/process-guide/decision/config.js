const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const decisionRoute = 'decision';

const decisionURL = getProcessGuidePageURL(decisionRoute);

const decisionTitle = 'Decision';

const decisionContent =
	'The decision stage is when the relevant Secretary of State then reviews the report and makes the final decision. They have 3 months to make a decision.';

const decisionLinkText = 'Who makes the final decision';

module.exports = {
	decisionRoute,
	decisionURL,
	decisionTitle,
	decisionContent,
	decisionLinkText
};
