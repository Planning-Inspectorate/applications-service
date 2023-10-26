const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const acceptanceRoute = 'review-of-the-application';

const acceptanceURL = getProcessGuidePageURL(acceptanceRoute);

const acceptanceTitle = 'Acceptance';

const acceptanceContent =
	'This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.';

const acceptanceLinkText = 'How the acceptance stage works and what happens next';

module.exports = {
	acceptanceRoute,
	acceptanceURL,
	acceptanceTitle,
	acceptanceContent,
	acceptanceLinkText
};
