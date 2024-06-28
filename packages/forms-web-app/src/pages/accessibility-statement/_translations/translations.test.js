const enAccessibilityStatementTranslations = require('./en.json');
const cyAccessibilityStatementTranslations = require('./cy.json');

describe('pages/accessibility-statement/_translations', () => {
	it('should return the correct English translations', () => {
		expect(enAccessibilityStatementTranslations).toMatchSnapshot();
	});

	it('should return the correct Welsh translations', () => {
		expect(cyAccessibilityStatementTranslations).toMatchSnapshot();
	});

	it('should return the same keys for the English and Welsh translations', () => {
		expect(enAccessibilityStatementTranslations).toHaveSameKeys(
			cyAccessibilityStatementTranslations
		);
	});
});
