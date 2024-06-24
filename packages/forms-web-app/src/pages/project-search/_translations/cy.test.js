const cyProjectSearchTranslations = require('./cy.json');

describe('pages/project-search/_translations/cy', () => {
	it('should return the welsh projects index translations', () => {
		expect(cyProjectSearchTranslations).toEqual({
			common: {
				projects: 'prosiectau'
			},
			pageTitle: 'Project search',
			heading1: 'Prosiectau',
			paragraph1:
				"Dyma restr o'r holl brosiectau. I ddod o hyd i brosiect penodol, defnyddiwch yr opsiynau hidlo neu chwiliwch yn ôl enw'r prosiect neu'r ymgeisydd.",
			linkText1:
				"Lawrlwythwch dabl sy'n cynnwys rhestr lawn o bob un o'r {{-totalApplications}} o brosiectau (CSV)",
			accessibilityText1: 'Chwilio am brosiect',
			heading2: "Canlyniadau wedi'u hidlo",
			paragraph2: 'Yn dangos {{-from}} i {{-to}} o {{-total}} brosiectau.',
			noResultsFound: {
				paragraph1:
					"Ni ddaethpwyd o hyd i unrhyw ganlyniadau sy'n cyfateb i'ch termau chwilio a'ch dewisiadau hidlo.",
				paragraph2:
					"A hoffech chi glirio'ch chwiliad a'ch dewisiadau hidlo i weld yr holl brosiectau yn lle hynny?",
				linkText1: 'Clirio chwiliad a dewisiadau hidlo'
			},
			filterLabels: {
				region: 'Location',
				sector: 'Sector',
				stage: 'Cam'
			},
			sortByLinks: {
				projectName: "Enw'r Prosiect",
				promoterName: 'Ymgeisydd',
				stage: 'Cam'
			}
		});
	});
});
