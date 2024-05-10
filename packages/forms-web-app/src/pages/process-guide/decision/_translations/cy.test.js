const cyDecisionTranslations = require('./cy.json');

describe('pages/process-guide/decision/_translations/cy', () => {
	it('should return the welsh process guide decision page translations', () => {
		expect(cyDecisionTranslations).toEqual({
			heading2: "Ynglŷn â'r cam penderfynu",
			paragraph1:
				"Yna, bydd gan yr Ysgrifennydd Gwladol perthnasol 3 mis arall i wneud y penderfyniad. Bydd yr Ysgrifennydd Gwladol perthnasol yn ystyried adroddiad yr Awdurdod Archwilio i benderfynu a ddylai'r datblygiad fynd ymlaen. Pan wneir penderfyniad, byddwn yn cyhoeddi'r penderfyniad a'r adroddiad ar dudalen trosolwg y prosiect perthnasol."
		});
	});
});
