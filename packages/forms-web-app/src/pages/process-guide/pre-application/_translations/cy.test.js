const cyPreApplicationTranslations = require('./cy.json');

describe('pages/process-guide/pre-application/_translations/cy', () => {
	it('should return the welsh process guide pre-application page translations', () => {
		expect(cyPreApplicationTranslations).toEqual({
			heading2: 'Y cam cyn-ymgeisio',
			paragraph1:
				"Cyn i ymgeisydd anfon ei gais ar gyfer datblygiad arfaethedig at yr Arolygiaeth Gynllunio, mae'n rhaid iddo gynnal ymgynghoriad cyhoeddus. Yna, bydd yr adborth hwn yn cael ei ystyried a'i ddefnyddio i helpu i ffurfio'r prosiect arfaethedig. Mae hyn yn digwydd yn ystod y cam cyn-ymgeisio.",
			paragraph2: "Mae'n rhaid i'r ymgeisydd ymgynghori â'r canlynol:",
			listItem1: 'y cyhoedd',
			listItem2: 'cynghorau plwyf',
			listItem3: 'ymgyngoreion statudol',
			listItem4: 'awdurdodau lleol a chynghorau',
			listItem5: 'tirfeddianwyr a thenantiaid',
			paragraph3:
				"Mae'n rhaid iddo ystyried yr holl sylwadau a gwybodaeth gan aelodau o'r cyhoedd a sefydliadau.",
			paragraph4:
				"Mae'n bwysig iawn cymryd rhan yn ymgynghoriad yr ymgeisydd yn ystod y cam cyn-ymgeisio. Dyma'ch cyfle i ofyn unrhyw gwestiynau a mynegi unrhyw bryderon, a chael gwybod mwy am y datblygiad a sut gallai effeithio ar yr ardal.",
			paragraph5: '{{-link}}.',
			paragraph5LinkText: "Gwiriwch y canllaw ar sut gallwch leisio'ch barn",
			heading3: "Ynglŷn â'r gwasanaeth cyn-ymgeisio ar gyfer ymgeiswyr",
			paragraph6:
				"Rydym yn cynnig gwasanaeth cyn-ymgeisio i ymgeiswyr sy'n paratoi cais. Mae hwn yn wasanaeth sy'n seiliedig ar ffi. {{-link}}",
			paragraph6LinkText:
				'Edrychwch ar ein prosbectws cyn ymgeisio i gael rhagor o wybodaeth am y strwythur ffioedd.',
			paragraph7: "Mae'n cynnwys:",
			listItem6: 'rhoi cyngor ar sut i baratoi cais',
			listItem7: 'gwiriadau cyn-cyflwyno ac adolygu dogfennau drafft',
			listItem8: "gwirio bod ymgeiswyr wedi dilyn yr holl gamau sy'n ofynnol",
			heading4: 'Cyngor i awdurdodau lleol yn ystod y cam cyn-ymgeisio',
			paragraph8:
				"Gallwch ddarllen ein tudalennau cyngor sy'n cynnwys rhagor o wybodaeth am {{-link}}.",
			paragraph8LinkText:
				'yr hyn y mae angen i chi ei wneud os ydych yn cynrychioli awdurdod lleol',
			heading5: 'Cyngor manylach',
			paragraph9:
				'Os oes arnoch angen cyngor manylach, gallwch gyfeirio at ein tudalennau cyngor i gael rhagor o wybodaeth.',
			paragraph10LinkText: 'Darllenwch y gyfres lawn o tudalennau cyngor manwl'
		});
	});
});
