const cyGetUpdatesConfirmYourEmailTranslations = require('./cy.json');

describe('pages/projects/get-updates/confirm-your-email/_translations/cy.json', () => {
	it('should return the Welsh get updates confirm your email page translations', () => {
		expect(cyGetUpdatesConfirmYourEmailTranslations).toEqual({
			title1: 'Cael diweddariadau a chadarnhau e-bost',
			heading1: 'Cadarnhewch eich bod eisiau cael negeseuon e-bost',
			paragraph1: 'Rydym wedi anfon neges e-bost at',
			paragraph2:
				'Gwiriwch eich e-bost a chadarnhewch eich bod eisiau cael diweddariadau ynghylch:',
			paragraph3: 'Ni fydd y ddolen yn gweithio mwyach ar ôl 48 awr.',
			linkText1: 'Heb dderbyn neges e-bost?',
			paragraph4:
				"Os nad yw'r neges e-bost wedi cyrraedd eich mewnflwch, gwiriwch eich ffolder sbam neu sothach.",
			paragraph5: 'Os nad yw hyn yn gweithio, {{-link}}',
			paragraph5LinkText1: 'gofynnwch am hysbysiad e-bost newydd.'
		});
	});
});
