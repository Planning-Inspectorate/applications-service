const cySection51IndexTranslations = require('./cy.json');

describe('pages/projects/section-51/index/_translations/cy.json', () => {
	it('should return the Welsh section 51 index page translations', () => {
		expect(cySection51IndexTranslations).toEqual({
			paragraph1:
				"Mae'r rhestr isod yn cynnwys cofnod o gyngor a roddwyd gennym ar gyfer y prosiect hwn.",
			paragraph2:
				"Mae dyletswydd statudol, o dan {{-link}}, ynglŷn â chais neu ddarpar gais. Mae hyn yn cynnwys cofnodi enw'r unigolyn a ofynnodd am y cyngor a'r cyngor a roddwyd. Mae'n rhaid i'r wybodaeth hon gael ei chyhoeddi.",
			paragraph2LinkText1: 'adran 51 Deddf Cynllunio 2008',
			heading2: 'Chwilio cyngor',
			paragraph3:
				"Chwiliwch yn ôl geiriau allweddol er enghraifft, log cyngor Ymgeisydd neu enw'r unigolyn y rhoddwyd y cyngor iddo.",
			phrase1: 'Yn dangos',
			phrase2: 'i',
			phrase3: 'o',
			phrase4: "o ddogfennau, gyda'r rhai mwyaf newydd yn gyntaf.",
			paragraph4: "Ni ddaethpwyd o hyd i unrhyw gyngor sy'n cyfateb i'ch term chwilio.",
			paragraph5:
				"A hoffech chi glirio'ch chwiliad i weld yr holl gyngor sydd ar gael yn lle hynny?",
			paragraph6: "Nid oes unrhyw gyngor i'w ddangos ar gyfer y prosiect hwn"
		});
	});
});
