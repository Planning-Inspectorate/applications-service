const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const decisionMadeRoute = 'what-happens-after-decision';

const decisionMadeURL = getHaveYourSayGuidePageURL(decisionMadeRoute);

const decisionMadeTitle = 'What you can do after the decision has been made';

const decisionMadeContent =
	'Once a decision is made by the relevant Secretary of State, there is a 6 week period where people can challenge the decision in the High Court. This is called a judicial review.';

const decisionMadeLinkText = 'What happens after a decision has been made?';

module.exports = {
	decisionMadeURL,
	decisionMadeTitle,
	decisionMadeContent,
	decisionMadeLinkText
};
