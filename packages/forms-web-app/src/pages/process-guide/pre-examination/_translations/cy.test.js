const cyPreExaminationTranslations = require('./cy.json');

describe('pages/process-guide/pre-examination/_translations/cy', () => {
	it('should return the welsh process guide pre-examination page translations', () => {
		expect(cyPreExaminationTranslations).toEqual({
			heading2: 'Paratoi ar gyfer y cam archwilio',
			heading3: "Cofrestru i leisio'ch barn",
			heading4: 'Cyfarfod rhagarweiniol',
			heading5: 'Beth fydd yn digwydd nesaf',
			heading6: 'Cyngor manylach',
			listItem1: 'cynllunio beth fydd yn digwydd yn ystod yr archwiliad',
			listItem2: 'trefnu unrhyw wrandawiadau',
			listItem3: 'gosod terfynau amser drafft ar gyfer sylwadau',
			listItem4:
				"unrhyw beth a allai effeithio ar eich gallu i fynychu gwrandawiadau neu fodloni terfynau amser, er enghraifft digwyddiadau lleol eraill sy'n cael eu cynnal ar yr un pryd neu faterion yn ymwneud â theithio neu batrymau gwaith ",
			listItem5:
				'a oes unrhyw fannau lleol addas i gynnal unrhyw wrandawiadau a allai fod yn ofynnol',
			listItem6:
				'a oes unrhyw grwpiau o bobl y mae arnynt angen ymagwedd wahanol i allu cymryd rhan yn y broses',
			listItem7: "unrhyw faterion eraill sy'n ymwneud â'r amserlen archwilio ddrafft",
			paragraph1:
				"Y cam cyn-archwilio yw'r adeg pan fyddwn yn paratoi ar gyfer archwiliad. Mae'r Awdurdod Archwilio'n cynnwys un neu fwy o arolygwyr a fydd yn cynllunio ar gyfer y cam archwilio.",
			paragraph10: 'Gallwch sôn am y canlynol:',
			paragraph11:
				"Byddwn yn cyhoeddi nodiadau'r cyfarfod a recordiad yn adran y prosiect ar y wefan hon oddeutu wythnos ar ôl y cyfarfod rhagarweiniol.",
			paragraph12:
				"Anfonir y llythyr rheol 8 at bawb a gofrestrodd, yn ogystal â chyrff swyddogol a phobl yr effeithir ar eu tir yn uniongyrchol. Mae'r llythyr hwn yn rhoi manylion am yr archwiliad, gan gynnwys yr amserlen derfynol gyda'r holl derfynau amser ar gyfer cyflwyno sylwadau i'r archwiliad.",
			paragraph13: 'Gallwch ddod o hyd i {{-link}}.',
			paragraph13LinkText: 'gyngor manylach yn ein tudalennau cyngor',
			paragraph2:
				"Bydd yr Awdurdod Archwilio'n gwneud asesiad cychwynnol o'r materion y bydd angen eu trafod.",
			paragraph3: 'Bydd yr Awdurdod Archwilio yn:',
			paragraph4: "Mae'n rhaid i chi gofrestru yn ystod y cam cyn-archwilio i leisio'ch barn.",
			paragraph5:
				'Bydd y cyfnod cofrestru ar gyfer pob prosiect ar agor am 30 niwrnod o leiaf i roi amser i chi gofrestru. Bydd y dyddiad cau ar gyfer cofrestru yn cael ei nodi yn hysbyseb yr ymgeisydd, neu fe allwch wirio tudalen y prosiect ar y wefan hon. Gallwch wneud hyn trwy glicio ar y ddolen Pob prosiect ar frig y dudalen hon a chwilio am y prosiect.',
			paragraph6:
				"Mae canllaw ar wahân ar gael sy'n cynnwys rhagor o wybodaeth am gamau'r broses ar gyfer {{-link}}.",
			paragraph6LinkText:
				"pobl neu sefydliadau sydd eisiau lleisio'u barn am brosiect seilwaith cenedlaethol",
			paragraph7:
				"Bydd yr Awdurdod Archwilio'n cynnal cyfarfod rhagarweiniol rywbryd ar ôl i'r cyfnod cofrestru i leisio'ch barn gau.",
			paragraph8:
				"Sawl wythnos cyn y cyfarfod hwn, anfonir y llythyr rheol 6 at bawb a gofrestrodd i leisio'i farn, cyrff swyddogol a phobl yr effeithir ar eu tir yn uniongyrchol. Mae'r llythyr rheol 6 yn dweud wrth bawb pryd a ble y bydd y cyfarfod yn cael ei gynnal. Bydd hefyd yn cynnwys amserlen ddrafft ar gyfer yr archwiliad.",
			paragraph9: 'Ni allwch roi eich barn am y datblygiad arfaethedig yn y cyfarfod hwn.'
		});
	});
});
