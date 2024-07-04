const registerOfApplicationsTranslations__CY = require('./cy.json');

describe('pages/register-of-applications/_translations/cy', () => {
	it('should return the welsh index page translations', () => {
		expect(registerOfApplicationsTranslations__CY).toEqual({
			heading1: 'Cofrestr geisiadau',
			paragraph1:
				"Rhoddir isod restr o'r holl geisiadau a gyflwynwyd ers 2008. Mae hyn yn cydymffurfio ag Adran 39 Deddf Cynllunio 2008.",
			paragraph2: "Chwiliwch yn ôl enw'r prosiect neu'r ymgeisydd.",
			linkText1:
				"Lawrlwythwch dabl sy'n cynnwys rhestr lawn o bob un o'r {{-totalApplications}} o brosiectau (CSV)",
			paragraph3: 'Yn dangos {{-from}} i {{-to}} o {{-total}} brosiectau.',
			sortByLinks: {
				projectName: "Enw'r prosiect",
				location: 'Lleoliad',
				applicant: 'Ymgeisydd',
				dateOfApplication: 'Dyddiad y cais',
				dateOfDecision: 'Dyddiad y penderfyniad',
				stage: 'Cam'
			}
		});
	});
});
