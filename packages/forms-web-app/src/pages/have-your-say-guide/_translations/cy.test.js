const cyHaveYourSayGuideTranslations = require('./cy.json');

describe('pages/have-your-say-guide/_translations/cy', () => {
	it('should return the welsh have your say guide translations', () => {
		expect(cyHaveYourSayGuideTranslations).toEqual({
			common: { haveYourSayGuide: 'Have your say guide' },
			decisionMade: {
				heading1: "Yr hyn y gallwch ei wneud ar ôl i'r penderfyniad gael ei wneud",
				linkText: 'Beth fydd yn digwydd ar ôl i benderfyniad gael ei wneud?',
				paragraph1:
					"Pan fydd yr Ysgrifennydd Gwladol perthnasol wedi gwneud penderfyniad, mae cyfnod 6 wythnos pryd y gall pobl herio'r penderfyniad yn yr Uchel Lys. Gelwir hyn yn adolygiad barnwrol."
			},
			duringExamination: {
				heading1: "Lleisio'ch barn yn ystod yr archwiliad o'r cais",
				linkText: 'Cyflwyno sylwadau yn ystod y cam archwilio.',
				paragraph1:
					"Yn ystod y cam hwn, mae'r Awdurdod Archwilio'n gofyn cwestiynau am y datblygiad arfaethedig. Gall yr ymgeisydd ac unrhyw un sydd wedi cofrestru i leisio'i farn wneud sylwadau erbyn y terfynau amser yn amserlen yr archwiliad. Gall unrhyw un fynychu gwrandawiadau a allai gael eu cynnal yn ystod y cam hwn. Gall yr archwiliad gymryd hyd at 6 mis."
			},
			getInvolved: {
				heading1: 'Cymryd rhan yn y cyfarfod rhagarweiniol',
				linkText: 'Yr hyn y gallwch ei wneud yn y cyfarfod rhagarweiniol.',
				paragraph1:
					"Yn ystod y misoedd ar ôl i'r cyfnod cofrestru gau, bydd yr Awdurdod Archwilio'n cynnal cyfarfod rhagarweiniol. Diben y cyfarfod hwn yw trafod y prif faterion y bydd yr Awdurdod Archwilio'n eu harchwilio, a'r amserlen ar gyfer y cam archwilio."
			},
			index: { heading1: "Lleisio'ch barn am brosiect seilwaith cenedlaethol" },
			registering: {
				heading1: "Cofrestru i leisio'ch barn am brosiect seilwaith cenedlaethol",
				linkText: "Sut i gofrestru i leisio'ch barn am brosiect seilwaith cenedlaethol.",
				paragraph1:
					"I gymryd rhan ar ôl i'r cais gael ei gyflwyno i'r Arolygiaeth Gynllunio, mae'n rhaid i chi gofrestru i leisio'ch barn yn ystod y cam cyn-archwilio. Dyma'r adeg pan fyddwn yn paratoi ar gyfer archwiliad. Byddwn yn amlygu arolygydd neu banel o arolygwyr a elwir yn Awdurdod Archwilio ac yn llunio cynllun ar gyfer y cam archwilio. Bydd y cyfnod cofrestru ar agor am 30 niwrnod o leiaf. Bydd y cam cyn-archwilio'n cymryd tua 3 mis."
			},
			takingPart: {
				heading1: "Cymryd rhan yn ystod y cam cyn-ymgeisio, Cuddio'r adran hon",
				linkText: "Cymryd rhan cyn i'r cais gael ei gyflwyno i'r Arolygiaeth Gynllunio.",
				paragraph1:
					"Y cam cyn-ymgeisio yw cam cyntaf y broses. Dyma pryd mae'n rhaid i'r ymgeisydd ymgynghori â phobl a sefydliadau. Mae'n rhaid i'r ymgeisydd ddarparu gwybodaeth am sut gallwch gyflwyno'ch sylwadau iddo. Mae'n bwysig cymryd rhan yn ystod y cam hwn oherwydd gallwch ddylanwadu ar y cais cyn i'r ymgeisydd ei anfon at yr Arolygiaeth Gynllunio."
			}
		});
	});
});
