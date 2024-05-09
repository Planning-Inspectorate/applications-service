const cyPostDecisionTranslations = require('./cy.json');

describe('pages/process-guide/post-decision/_translations/cy', () => {
	it('should return the welsh process guide post decision page translations', () => {
		expect(cyPostDecisionTranslations).toEqual({
			heading2: "Ar ôl i'r penderfyniad gael ei wneud",
			paragraph1:
				"Ar ôl i'r Ysgrifennydd Gwladol wneud ei benderfyniad, mae cyfnod o 6 wythnos pryd y gall pobl herio'r penderfyniad yn yr Uchel Lys. Yr enw ar hyn yw adolygiad barnwrol."
		});
	});
});
