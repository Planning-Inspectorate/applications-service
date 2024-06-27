const projectsTranslations__CY = require('./cy.json');

describe('pages/projects/_translations/cy', () => {
	it('should return the welsh projects translations', () => {
		expect(projectsTranslations__CY).toEqual({
			navigation: {
				index: 'Gwybodaeth am y prosiect',
				documents: 'Dogfennau',
				register: "Cofrestru i leisio'ch barn",
				representations: 'Sylwadau perthnasol (sylwadau cofrestru)',
				examinationTimetable: 'Amserlen yr archwiliad',
				haveYourSay: 'Dweud eich dweud',
				getUpdates: 'Cael diweddariadau',
				section51: 'Cyngor Adran 51'
			}
		});
	});
});
