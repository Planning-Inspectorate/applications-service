const cyGetUpdatesEmailTranslations = require('./cy.json');

describe('pages/projects/get-updates/email/_translations/cy.json', () => {
	it('should return the Welsh get updates email page translations', () => {
		expect(cyGetUpdatesEmailTranslations).toEqual({
			heading1: "Beth yw'ch cyfeiriad e-bost?",
			linkText1: "Sut rydym yn defnyddio'ch gwybodaeth",
			paragraph1:
				'Bydd diweddariadau e-bost yr Arolygiaeth Gynllunio yn storio gwybodaeth a ddarparwyd gennych yn unig.',
			paragraph2:
				"Gallwch gael at eich diweddariadau e-bost a'r wybodaeth sy'n gysylltiedig â nhw, eu diweddaru neu eu dileu'n barhaol unrhyw bryd.",
			paragraph3: 'Ni fyddwn byth:',
			listItem1: 'yn gwerthu nac yn rhentu eich gwybodaeth i drydydd parti',
			listItem2: 'yn rhannu eich gwybodaeth gyda thrydydd parti at ddibenion marchnata',
			paragraph4:
				"Gallwch ddarllen yr {{-link}} i gael rhagor o fanylion am sut mae eich gwybodaeth yn cael ei storio, ei rhannu a'i defnyddio.",
			paragraph4LinkText1: 'hysbysiad preifatrwydd llawn',
			errorMessage: 'Mae yna broblem'
		});
	});
});
