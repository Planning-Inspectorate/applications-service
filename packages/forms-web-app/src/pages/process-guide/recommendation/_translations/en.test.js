const enRecommendationTranslations = require('./en.json');

describe('pages/process-guide/recommendation/_translations/en', () => {
	it('should return the english process guide recommendation page translations', () => {
		expect(enRecommendationTranslations).toEqual({
			heading2: 'About the recommendation stage',
			paragraph1:
				"After the Examining Authority has completed all its enquiries and understood everyone's views during the examination, it will then write its recommendation report. The report must be completed and sent to the relevant Secretary of State within 3 months of the end of the examination."
		});
	});
});
