const cyProjectsDocumentsTranslations = require('./cy.json');

describe('pages/projects/documents/_translations/cy', () => {
	it('should return the welsh projects documents page translations', () => {
		expect(cyProjectsDocumentsTranslations).toEqual({
			heading1: 'Dogfennau',
			heading2: 'Chwilio dogfennau',
			noResults: {
				linkText1: 'Return to the project overview',
				paragraph1: 'There are no project application documents available to display at the moment.'
			},
			noResultsFound: {
				linkText1: 'Clirio chwiliad a dewisiadau hidlo',
				paragraph1:
					"Ni ddaethpwyd o hyd i unrhyw ganlyniadau sy'n cyfateb i'ch term chwilio na'ch dewisiadau hidlo.",
				paragraph2:
					"A hoffech chi glirio'ch chwiliad a'ch dewisiadau hidlo i weld yr holl ddogfennau sydd ar gael yn lle hynny?"
			},
			paragraph1: "{{-link}} sy'n cynnwys rhifau cyfeirnod dogfennau",
			paragraph1LinkText: 'Edrychwch ar lyfrgell yr archwiliad',
			paragraph2: "Chwilio yn ôl awdur, disgrifiad neu'r math o ddogfen.",
			paragraph3:
				"Yn dangos {{-from}} i {{-to}} o {{-total}} o ddogfennau, gyda'r rhai mwyaf newydd yn gyntaf."
		});
	});
});
