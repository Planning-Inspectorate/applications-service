const {
	recommendationRoute,
	recommendationURL,
	recommendationTitle,
	recommendationContent,
	recommendationLinkText
} = require('./config');

describe('pages/process-guide/recommendation/config', () => {
	it('should return the recommendation stage config', () => {
		expect(recommendationRoute).toEqual('recommendation');
		expect(recommendationURL).toEqual('/decision-making-process-guide/recommendation');
		expect(recommendationTitle).toEqual('Recommendation');
		expect(recommendationContent).toEqual(
			'The Examining Authority writes its recommendation report. This must be completed and sent to the relevant Secretary of State within 3 months of the end of examination stage.'
		);
		expect(recommendationLinkText).toEqual('Making a recommendation.');
	});
});
