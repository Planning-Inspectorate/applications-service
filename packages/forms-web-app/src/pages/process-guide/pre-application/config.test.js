const { preApplicationRoute, preApplicationURL, preApplicationI18nNamespace } = require('./config');

describe('pages/process-guide/pre-application/config', () => {
	it('should return the pre-application stage config', () => {
		expect(preApplicationRoute).toEqual('pre-application');
		expect(preApplicationURL).toEqual('/decision-making-process-guide/pre-application');
		expect(preApplicationI18nNamespace).toEqual('preApplication');
	});
});
