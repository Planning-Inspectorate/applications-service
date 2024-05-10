const enDecisionTranslations = require('./en.json');

describe('pages/process-guide/decision/_translations/en', () => {
	it('should return the english process guide decision page translations', () => {
		expect(enDecisionTranslations).toEqual({
			heading2: 'About the decision stage',
			paragraph1:
				"The relevant Secretary of State then has another 3 months to make the decision. The relevant Secretary of State considers the Examining Authority's report to decide if the development should go ahead. When a decision is made, we will publish the decision and report on the relevant project overview page."
		});
	});
});
