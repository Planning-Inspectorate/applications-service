const cyTakingPartTranslations = require('./cy.json');

describe('pages/have-your-say-guide/taking-part/_translations/cy', () => {
	it('should return the welsh have your say guide taking part translations', () => {
		expect(cyTakingPartTranslations).toEqual({
			heading2: "Yr hyn sy'n digwydd yn ystod y cam cyn-ymgeisio",
			heading3: "Yr hyn y mae'n rhaid i'r ymgeisydd ei wneud",
			heading4: 'Sut gallwch gymryd rhan ar yr adeg hon',
			heading5: "Yr hyn y gallwch ei wneud os yw'r cais eisoes wedi cael ei gyflwyno",
			listItem1: 'y cyhoedd',
			listItem2: 'cynghorau plwyf',
			listItem3: 'ymgyngoreion statudol',
			listItem4: 'awdurdodau lleol a chynghorau',
			listItem5: 'tirfeddianwyr a thenantiaid',
			listItem6: "disgrifiad o'r prosiect",
			listItem7: 'ble y gallwch gael gwybod mwy am y prosiect',
			listItem8: 'y dyddiad cau ar gyfer anfon eich sylwadau ato',
			paragraph1:
				"Cyn i'r ymgeisydd anfon ei gais ar gyfer datblygiad seilwaith cenedlaethol arfaethedig at yr Arolygiaeth Gynllunio, mae'n rhaid iddo gynnal ymgynghoriad cyhoeddus. Mae hyn yn digwydd yn ystod y cam cyn-ymgeisio.",
			paragraph10:
				"Os yw'r cais wedi cael ei anfon at yr Arolygiaeth Gynllunio, gallwch gymryd rhan trwy gofrestru i leisio'ch barn.",
			paragraph11: "Mae'n rhaid i chi wneud hyn pan fydd y prosiect yn y cam cyn-archwilio.",
			paragraph2: "Mae'n rhaid i'r ymgeisydd ymgynghori â'r canlynol:",
			paragraph3:
				"Mae'n rhaid iddo gasglu'r holl sylwadau a gwybodaeth gan aelodau o'r cyhoedd a sefydliadau. Mae'r adborth hwn yn cael ei ystyried a'i ddefnyddio i helpu i ffurfio'r prosiect arfaethedig.",
			paragraph4: "Mae'n rhaid i'r ymgeisydd hysbysebu ei gyfnod ymgynghori.",
			paragraph5: "Mae'n rhaid i'r hysbyseb ymddangos am bythefnos o leiaf a chynnwys: ",
			paragraph6:
				"Mae'n rhaid i'r ymgeisydd hefyd gysylltu ag ymgyngoreion ac unrhyw un y mae'r datblygiad arfaethedig yn effeithio ar eu tir.",
			paragraph7: "Bydd angen i chi gysylltu â'r ymgeisydd i gymryd rhan ar yr adeg hon.",
			paragraph8:
				"Os oes tudalen brosiect ar y wefan hon, gallwch ddod o hyd i fanylion yr ymgeisydd yno. Fel arall, gallwch ganfod gwybodaeth yn y newyddion lleol neu ofyn i'ch awdurdod lleol.",
			paragraph9:
				"Mae'n bwysig iawn cymryd rhan yn ymgynghoriad yr ymgeisydd yn ystod y cam cyn-ymgeisio. Dyma'ch cyfle i ofyn unrhyw gwestiynau a mynegi unrhyw bryderon, a chael gwybod mwy am y datblygiad a sut gallai effeithio ar yr ardal."
		});
	});
});
