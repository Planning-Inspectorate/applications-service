const cyRepresentationsIndexTranslations = require('./cy.json');

describe('pages/projects/representations/index/_translations/cy.json', () => {
	it('should return the Welsh representations index page translations', () => {
		expect(cyRepresentationsIndexTranslations).toEqual({
			pageTitle1: 'Sylwadau Perthnasol',
			heading1: 'Sylwadau perthnasol (sylwadau cofrestru)',
			paragraph1:
				"Chwiliwch yn ôl yr unigolyn neu'r grŵp sy'n gwneud y cyflwyniad neu gynnwys y cyflwyniad.",
			phrase1: 'Yn dangos',
			phrase2: 'i',
			phrase3: 'o',
			phrase4: "o sylwadau, gyda'r rhai mwyaf newydd yn gyntaf.",
			paragraph5:
				"Mae'r sylwadau perthnasol ar gyfer y prosiect hwn wedi cael eu harchifo ac nid ydynt ar gael ar y safle hwn mwyach.",
			linkText1: 'Clirio pob hidlydd',
			paragraph6:
				"Nid oes unrhyw sylwadau cofrestru i'w harddangos.  Bydd sylwadau cofrestru yn cael eu cyhoeddi ar ôl i'r cyfnod cofrestru gau.",
			paragraph7:
				"Ni ddaethpwyd o hyd i unrhyw ganlyniadau sy'n cyfateb i'ch term chwilio na'ch dewisiadau hidlo.",
			paragraph8:
				"A hoffech chi glirio'ch chwiliad a'ch dewisiadau hidlo i weld yr holl sylwadau perthnasol yn lle?",
			linkText2: 'Clirio chwiliad a dewisiadau hidlo'
		});
	});
});
