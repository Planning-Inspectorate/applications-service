const cyRecommendationTranslations = require('./cy.json');

describe('pages/process-guide/recommendation/_translations/cy', () => {
	it('should return the welsh process guide recommendation page translations', () => {
		expect(cyRecommendationTranslations).toEqual({
			heading2: "Ynglŷn â'r cam argymhelliad",
			paragraph1:
				"Ar ôl i'r Awdurdod Archwilio gwblhau ei holl ymholiadau a deall safbwyntiau pawb yn ystod yr archwiliad, bydd yn ysgrifennu ei adroddiad argymhelliad. Mae'n rhaid i'r adroddiad gael ei gwblhau a'i anfon at yr Ysgrifennydd Gwladol perthnasol o fewn 3 mis o ddiwedd yr archwiliad."
		});
	});
});
