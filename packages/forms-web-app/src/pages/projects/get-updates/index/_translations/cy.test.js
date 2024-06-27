const cyGetUpdatesIndexTranslations = require('./cy.json');

describe('pages/projects/representations/index/_translations/cy.json', () => {
	it('should return the Welsh get updates index page translations', () => {
		expect(cyGetUpdatesIndexTranslations).toEqual({
			title1: 'Cael diweddariadau',
			heading1: "Cael diweddariadau ynglŷn â'r prosiect hwn",
			canSignupToUpdates: {
				paragraph1: 'Rydych yn cofrestru i gael diweddariadau e-bost ynghylch',
				paragraph2:
					'Byddwn yn anfon diweddariadau e-bost pan fydd gwybodaeth am y datblygiad arfaethedig yn cael ei hychwanegu at y wefan.'
			},
			cannotSignupToUpdates: {
				paragraph1: 'Ni allwch bellach gael diweddariadau e-bost am',
				paragraph2: "Mae'r penderfyniad ar y prosiect hwn wedi'i wneud."
			}
		});
	});
});
