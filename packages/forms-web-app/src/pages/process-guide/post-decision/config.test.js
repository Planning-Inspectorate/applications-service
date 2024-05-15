const { postDecisionRoute, postDecisionURL, postDecisionI18nNamespace } = require('./config');

describe('pages/process-guide/post-decision/config', () => {
	it('should return the post-decision stage config', () => {
		expect(postDecisionRoute).toEqual('what-happens-after-the-decision-is-made');
		expect(postDecisionURL).toEqual(
			'/decision-making-process-guide/what-happens-after-the-decision-is-made'
		);
		expect(postDecisionI18nNamespace).toEqual('postDecision');
	});
});
