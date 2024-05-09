const { decisionRoute, decisionURL, decisionI18nNamespace } = require('./config');

describe('pages/process-guide/decision/config', () => {
	it('should return the decision stage config', () => {
		expect(decisionRoute).toEqual('decision');
		expect(decisionURL).toEqual('/decision-making-process-guide/decision');
		expect(decisionI18nNamespace).toEqual('decision');
	});
});
