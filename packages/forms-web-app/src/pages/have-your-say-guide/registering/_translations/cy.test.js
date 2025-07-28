const cyRegisteringTranslations = require('./cy.json');

describe('pages/have-your-say-guide/registering/_translations/cy', () => {
	it('should return the welsh have your say guide registering translations', () => {
		expect(cyRegisteringTranslations).toEqual({
			heading2: "Pwy sy'n gallu cofrestru",
			paragraph1: "Gall unrhyw un gofrestru i leisio'i farn, gan gynnwys:",
			listItem1: "aelodau'r cyhoedd o'r ardal leol neu unrhyw le yn y Deyrnas Unedig",
			listItem2: "aelodau'r cyhoedd o wledydd eraill",
			listItem3:
				'sefydliadau fel awdurdodau lleol, cynghorau plwyf, cyrff lleol ac awdurdodau fel Natural England ac Asiantaeth yr Amgylchedd',
			listItem4: 'elusennau, grwpiau gweithredu lleol a busnesau',
			heading3: 'Pryd i gofrestru',
			paragraph2:
				"Bydd y cyfnod cofrestru ar agor am 30 niwrnod o leiaf ar gyfer pob prosiect, yn ystod y cam cyn-archwilio. Dyma'r cam paratoi ar gyfer archwilio'r cais. Mae'n rhaid i chi gofrestru yn ystod yr adeg hon i gael eich rhif cyfeirnod parti â buddiant a gwneud yn siŵr bod eich sylwadau'n cael eu hystyried.",
			paragraph3:
				"Bydd y datblygwr yn hysbysebu pan fydd y prosiect wedi cael ei dderbyn i'w archwilio. Mae'n rhaid iddo hefyd roi manylion ynglŷn â phryd y bydd y cyfnod cofrestru ar gyfer y prosiect yn agor a chau a sut gallwch gofrestru.",
			heading4: 'Yr hyn y mae arnoch ei angen i gofrestru',
			paragraph4: "I gofrestru, bydd angen i chi roi'r canlynol i ni:",
			listItem5: 'eich enw llawn',
			listItem6: "eich cyfeiriad post, eich cyfeiriad e-bost a'ch rhif ffôn",
			listItem7: "eich sylwadau ynglŷn â'r prosiect",
			paragraph5:
				"Ar ôl i chi gofrestru, rhoddir rhif cyfeirnod i chi. Y rhif cyfeirnod hwn fydd eich rhif cyfeirnod parti â buddiant. Bydd eich enw a'ch sylwadau'n cael eu cyhoeddi ar ein gwefan. Bydd eich cyfeiriad post, eich cyfeiriad e-bost a'ch rhif ffôn yn cael eu cadw'n breifat. {{-link}}.",
			paragraph5LinkText:
				"Gallwch ddarllen ein hysbysiad preifatrwydd i gael rhagor o wybodaeth (sy'n agor mewn tab newydd)",
			paragraph6:
				'You must include comments with your registration. Your comments must be about what you consider to be the main issues and impacts. You should include as much detail as possible and cover anything that may affect your day-to-day life.',
			heading5: 'Ar ôl i chi gofrestru',
			paragraph7:
				"Pan fyddwch wedi cofrestru i leisio'ch barn, bydd eich enw a'ch sylwadau'n cael eu cyhoeddi ar y dudalen gwybodaeth am y prosiect ar gyfer pob prosiect. Pan fydd y cyfnod cofrestru'n cau, gallwch weld yr holl sylwadau cofrestredig eraill (a elwir hefyd yn sylwadau perthnasol) gan bobl eraill.",
			paragraph8:
				"Pan fydd yr archwiliad o'r cais yn dechrau, gallwch gyflwyno rhagor o wybodaeth erbyn y terfynau amser yn yr amserlen. Gallwch wneud hyn gan ddefnyddio'r ffurflen gyflwyno ar-lein yn adran y prosiect penodol ar y wefan hon.",
			heading6: "Cofrestru i leisio'ch barn",
			paragraph9:
				'Bydd y dyddiad cau ar gyfer cofrestru yn cael ei nodi yn hysbyseb y datblygwr, neu fe allwch wirio tudalen y prosiect.',
			heading7: 'Cyngor manylach',
			paragraph10:
				'Os oes arnoch angen cyngor manylach, gallwch gyfeirio at ein tudalennau cyngor i gael rhagor o wybodaeth.',
			linkText1: "Darllenwch y gyfres lawn o tudalennau cyngor (sy'n agor mewn tab newydd)"
		});
	});
});
