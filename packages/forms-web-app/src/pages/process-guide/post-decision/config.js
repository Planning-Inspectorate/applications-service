const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const postDecisionRoute = 'what-happens-after-the-decision-is-made';

const postDecisionURL = getProcessGuidePageURL(postDecisionRoute);

const postDecisionTitle = 'What happens after the decision is made';

const postDecisionContent =
	'Once the Secretary of State has made a decision, there is a 6 week period where people can challenge the decision in the high court. This is called a judicial review.';

const postDecisionLinkText = 'What you can do after the decision has been made.';

module.exports = {
	postDecisionRoute,
	postDecisionURL,
	postDecisionTitle,
	postDecisionContent,
	postDecisionLinkText
};
