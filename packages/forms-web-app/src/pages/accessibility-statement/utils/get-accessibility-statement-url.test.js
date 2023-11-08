const { getAccessibilityStatementURL } = require('./get-accessibility-statement-url');

describe('pages/accessibility-statement/utils/get-accessibility-statement-url', () => {
	describe('#getAccessibilityStatementURL', () => {
		it('should return the accessibility statement URL', () => {
			expect(getAccessibilityStatementURL).toEqual('/accessibility-statement');
		});
	});
});
