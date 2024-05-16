const cyContactTranslations = require('./cy.json');

describe('pages/contact/_translations/cy', () => {
	it('should return the welsh contact page translations', () => {
		expect(cyContactTranslations).toEqual({
			heading1: 'Cysylltu â ni',
			heading2: 'Ymholiadau Cyffredinol',
			heading3: 'Adborth a chwynion',
			heading4: "Y wasg a'r cyfryngau",
			paragraph1:
				'Os ydych yn cysylltu â ni ynglŷn â phrosiect penodol, anfonwch neges e-bost at dîm y prosiect. Gellir gweld cyfeiriad e-bost tîm y prosiect ar dudalen y prosiect.',
			paragraph10:
				'Gallwch weld rhagor o wybodaeth am gysylltu â gwasanaethau cwsmeriaid yr Arolygiaeth Gynllunio ar {{-link}}.',
			paragraph11:
				"Mae'r Arolygiaeth Gynllunio yn ceisio darparu'r gwasanaeth gorau posibl i'w chwsmeriaid. Ceisiwn sicrhau bod pawb yn fodlon ar y gwasanaeth a gânt. Bydd cwynion ynglŷn â'r broses archwilio neu adroddiad terfynol yr Awdurdod Archwilio yn cael eu hystyried a rhoddir ymateb iddynt.",
			paragraph12: 'Ffôn:',
			paragraph13: 'E-bost:',
			paragraph14: "Mae Swyddfa'r Wasg GOV.UK ar agor o {{-openingHours}}.",
			paragraph2: "Os oes gennych ymholiad arall, gallwch gysylltu â ni trwy'r opsiynau canlynol:",
			paragraph3: 'Ffurflen gyswllt: {{-link}}',
			paragraph3LinkText: 'Llenwch ein ffurflen',
			paragraph4: 'E-bost: {{-link}}',
			paragraph5:
				"Os ydych yn cysylltu â ni ynglŷn â phrosiect penodol, rhowch enw'r prosiect yn y llinell bwnc. Mae'n bosibl na fyddwn yn gallu ymateb ar unwaith ar adegau prysur. ",
			paragraph6: 'Ffoniwch y gwasanaethau cwsmeriaid:',
			paragraph7: 'Dydd Llun i ddydd Gwener, 9am tan 12pm (heblaw am wyliau cyhoeddus)',
			paragraph8: 'Cyfeiriad:',
			paragraph9: 'Dilynwch ni ar X:'
		});
	});
});
