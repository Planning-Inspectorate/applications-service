const enDecisionMadeTranslations = require('./en.json');

describe('pages/have-your-say-guide/decision-made/_translations/en', () => {
	it('should return the english have your say guide decision made translations', () => {
		expect(enDecisionMadeTranslations).toEqual({
			heading2: 'After the decision is made',
			paragraph1:
				'After the relevant Secretary of State has made their decision, there is a 6 week period where people can challenge the decision in the High Court. This is called a judicial review.',
			paragraph2: 'You can {{-link}}.',
			paragraph2LinkText:
				'find out more about the judicial review process and how it works (opens in a new tab)'
		});
	});
});
