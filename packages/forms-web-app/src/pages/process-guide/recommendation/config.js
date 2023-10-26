const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const recommendationRoute = 'recommendation';

const recommendationURL = getProcessGuidePageURL(recommendationRoute);

const recommendationTitle = 'Recommendation';

const recommendationContent =
	'The examining authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination.';

const recommendationLinkText = 'Making a recommendation';

module.exports = {
	recommendationRoute,
	recommendationURL,
	recommendationTitle,
	recommendationContent,
	recommendationLinkText
};
