const cyGetInvolvedTranslations = require('./cy.json');

describe('pages/have-your-say-guide/get-involved/_translations/cy', () => {
	it('should return the welsh have your say guide get involved translations', () => {
		expect(cyGetInvolvedTranslations).toEqual({
			heading2: "Ynglŷn â'r cyfarfod rhagarweiniol",
			paragraph1:
				"Yn ystod y misoedd ar ôl i'r cyfnod cofrestru gau, bydd yr Awdurdod Archwilio'n cynnal cyfarfod rhagarweiniol.",
			paragraph2:
				"Sawl wythnos cyn y cyfarfod hwn, bydd llythyr a elwir yn llythyr rheol 6 yn cael ei anfon at bawb a gofrestrodd i leisio'i farn. Mae'r llythyr hwn yn rhoi gwybod i bawb pryd a ble y bydd y cyfarfod yn cael ei gynnal. Bydd hefyd yn cynnwys amserlen ddrafft ar gyfer yr archwiliad o'r cais a sut bydd yr Awdurdod Archwilio yn archwilio'r cais.",
			heading3: "Mynychu'r cyfarfod rhagarweiniol",
			paragraph3: "I gymryd rhan yn y cyfarfod rhagarweiniol, mae'n rhaid i chi naill ai:",
			listItem1: "fod wedi cofrestru i leisio'ch barn, a bod â rhif cyfeirnod parti â buddiant",
			listItem2: 'bod â hawl statudol i gymryd rhan',
			paragraph4:
				"Ar ôl i'r cyfnod cofrestru gau, fe'ch gwahoddir i gyfarfod rhagarweiniol. Diben y cyfarfod hwn yw trafod sut bydd y cais yn cael ei archwilio. Gallwch ddewis peidio â mynychu'r cyfarfod hwn a byddwch yn cael gwahoddiad o hyd i gyflwyno rhagor o wybodaeth pan fydd yr archwiliad yn dechrau.",
			paragraph5: 'Ni allwch roi eich barn am y datblygiad arfaethedig yn y cyfarfod hwn.',
			paragraph6: 'Gallwch sôn am y canlynol:',
			listItem3:
				"unrhyw beth a allai effeithio ar eich gallu i fynychu gwrandawiadau neu fodloni terfynau amser, er enghraifft digwyddiadau lleol eraill sy'n cael eu cynnal ar yr un pryd neu faterion yn ymwneud â theithio neu batrymau gwaith",
			listItem4: 'a oes unrhyw fannau lleol addas i gynnal y gwrandawiadau',
			listItem5:
				'a oes unrhyw grwpiau o bobl y mae arnynt angen ymagwedd wahanol i allu cymryd rhan yn y broses',
			listItem6: "unrhyw faterion eraill sy'n ymwneud â'r amserlen archwilio ddrafft",
			heading4: 'Beth fydd yn digwydd nesaf',
			paragraph7:
				"Bydd yr Arolygiaeth Gynllunio'n cyhoeddi nodiadau'r cyfarfod a recordiad ffrwd fyw yn adran y prosiect ar y wefan hon wythnos ar ôl y cyfarfod rhagarweiniol.",
			paragraph8:
				"Anfonir llythyr a elwir yn llythyr rheol 8 at bawb a gofrestrodd, yn ogystal ag unrhyw un sydd â hawl statudol. Bydd y llythyr hwn yn cynnwys manylion yr archwiliad, gan gynnwys yr amserlen derfynol gyda'r holl derfynau amser ar gyfer cyflwyno rhagor o wybodaeth."
		});
	});
});
