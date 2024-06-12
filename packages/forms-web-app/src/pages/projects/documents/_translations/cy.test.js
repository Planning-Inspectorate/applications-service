const cyProjectsDocumentsTranslations = require('./cy.json');

describe('pages/projects/documents/_translations/cy', () => {
	it('should return the welsh projects documents page translations', () => {
		expect(cyProjectsDocumentsTranslations).toEqual({
			common: {
				documents: 'dogfennau'
			},
			heading1: 'Dogfennau',
			paragraph1: "{{-link}} sy'n cynnwys rhifau cyfeirnod dogfennau",
			paragraph1LinkText: 'Edrychwch ar lyfrgell yr archwiliad',
			heading2: 'Chwilio dogfennau',
			paragraph2: "Chwilio yn ôl awdur, disgrifiad neu'r math o ddogfen.",
			paragraph3:
				"Yn dangos {{-from}} i {{-to}} o {{-total}} o ddogfennau, gyda'r rhai mwyaf newydd yn gyntaf.",
			noResultsFound: {
				paragraph1:
					"Ni ddaethpwyd o hyd i unrhyw ganlyniadau sy'n cyfateb i'ch term chwilio na'ch dewisiadau hidlo.",
				paragraph2:
					"A hoffech chi glirio'ch chwiliad a'ch dewisiadau hidlo i weld yr holl ddogfennau sydd ar gael yn lle hynny?",
				linkText1: 'Clirio chwiliad a dewisiadau hidlo'
			},
			noResults: {
				paragraph1: "Nid oes dogfennau cais prosiect ar gael i'w harddangos ar hyn o bryd.",
				linkText1: 'Dychwelyd at Drosolwg y Prosiect'
			},
			filteredResults: {
				heading1: "Canlyniadau wedi'u hidlo"
			}
		});
	});
});