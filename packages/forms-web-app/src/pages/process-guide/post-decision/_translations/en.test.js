const enPostDecisionTranslations = require('./en.json');

describe('pages/process-guide/post-decision/_translations/en', () => {
	it('should return the english process guide post decision page translations', () => {
		expect(enPostDecisionTranslations).toEqual({
			heading2: 'After the decision is made',
			paragraph1:
				'After the Secretary of State has made their decision, there is a 6-week period where people can challenge the decision in the high court. This is called a judicial review.'
		});
	});
});
