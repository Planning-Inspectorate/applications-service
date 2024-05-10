const { recommendationRoute, recommendationURL, recommendationI18nNamespace } = require('./config');

describe('pages/process-guide/recommendation/config', () => {
	it('should return the recommendation stage config', () => {
		expect(recommendationRoute).toEqual('recommendation');
		expect(recommendationURL).toEqual('/decision-making-process-guide/recommendation');
		expect(recommendationI18nNamespace).toEqual('recommendation');
	});
});
