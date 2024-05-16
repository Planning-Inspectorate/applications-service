const cyDecisionMadeTranslations = require('./cy.json');

describe('pages/have-your-say-guide/decision-made/_translations/cy', () => {
	it('should return the welsh have your say guide decision made translations', () => {
		expect(cyDecisionMadeTranslations).toEqual({
			heading2: "Ar ôl i'r penderfyniad gael ei wneud",
			paragraph1:
				"Ar ôl i'r Ysgrifennydd Gwladol perthnasol wneud ei benderfyniad, mae cyfnod o 6 wythnos pryd y gall pobl herio'r penderfyniad yn yr Uchel Lys. Yr enw ar hyn yw adolygiad barnwrol.",
			paragraph2: 'Gallwch {{-link}}.',
			paragraph2LinkText:
				"gael gwybod mwy am y broses adolygiad barnwrol a sut mae'n gweithio (sy'n agor mewn tab newydd)"
		});
	});
});
