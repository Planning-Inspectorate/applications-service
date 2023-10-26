const {
	acceptanceRoute,
	acceptanceURL,
	acceptanceTitle,
	acceptanceContent,
	acceptanceLinkText
} = require('./config');

describe('pages/process-guide/acceptance/config', () => {
	it('should return the acceptance stage config', () => {
		expect(acceptanceRoute).toEqual('review-of-the-application');
		expect(acceptanceURL).toEqual('/decision-making-process-guide/review-of-the-application');
		expect(acceptanceTitle).toEqual('Acceptance');
		expect(acceptanceContent).toEqual(
			'This is when the applicant sends us their application documents. We check if we can accept the application for examination. We have 28 days to make this decision.'
		);
		expect(acceptanceLinkText).toEqual('How the acceptance stage works and what happens next');
	});
});
