const { acceptanceRoute, acceptanceURL, acceptanceI18nNamespace } = require('./config');

describe('pages/process-guide/acceptance/config', () => {
	it('should return the acceptance stage config', () => {
		expect(acceptanceRoute).toEqual('review-of-the-application');
		expect(acceptanceURL).toEqual('/decision-making-process-guide/review-of-the-application');
		expect(acceptanceI18nNamespace).toEqual('acceptance');
	});
});
