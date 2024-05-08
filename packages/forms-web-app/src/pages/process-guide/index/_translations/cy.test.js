const cyIndexTranslations = require('./cy.json');

describe('pages/process-guide/index/_translations/cy', () => {
	it('should return the Welsh process guide index translations', () => {
		expect(cyIndexTranslations).toEqual({
			heading1: 'Y broses ar gyfer Prosiectau Seilwaith o Arwyddocâd Cenedlaethol (NSIPau)',
			paragraph1:
				'Mae Prosiectau Seilwaith o Arwyddocâd Cenedlaethol yn cael eu cyflwyno i’r Arolygiaeth Gynllunio. Ni yw asiantaeth y llywodraeth sy’n archwilio’r cynnig.',
			paragraph2: 'Gall unrhyw un gymryd rhan, gan gynnwys:',
			listItem1: 'ymgeiswyr',
			listItem2: 'y cyhoedd',
			listItem3: 'cyrff statudol',
			listItem4: 'elusennau',
			listItem5: 'awdurdodau lleol',
			paragraph3:
				'Bydd ymgeisydd yn cyflwyno cais ar gyfer gorchymyn caniatâd datblygu i’r Arolygiaeth Gynllunio. Gall y rhain fod yn ddatblygiadau fel:',
			listItem6: 'ffermydd gwynt alltraeth',
			listItem7: 'gorsafoedd pŵer a llinellau trydan',
			listItem8: 'traffyrdd a phrif ffyrdd eraill',
			listItem9: 'rheilffyrdd',
			listItem10: 'piblinellau nwy',
			paragraph4:
				'Rydym yn penodi arolygwyr annibynnol i archwilio ceisiadau a gwneud argymhellion i’r Ysgrifennydd Gwladol perthnasol ynglŷn â ph’un a ddylid rhoi caniatâd ar gyfer datblygiad.',
			paragraph5: 'Yr Ysgrifennydd Gwladol perthnasol sy’n gwneud y penderfyniad terfynol.',
			paragraph6:
				'Mae’r broses ar gyfer ystyried p’un a ddylid rhoi caniatâd ar gyfer prosiect seilwaith cenedlaethol yn cynnwys sawl cam. Gall y broses gyfan gymryd tua 18 mis.',
			heading2: 'Canllaw i bobl neu sefydliadau sydd eisiau lleisio’u barn',
			paragraph7:
				'Gall aelodau’r cyhoedd gymryd rhan mewn ymgynghoriadau cynnar cyn i gais gael ei gyflwyno trwy gysylltu â’r ymgeisydd yn uniongyrchol.',
			paragraph8:
				'Fel arall, gallwch gofrestru i leisio’ch barn ar y wefan hon yn ystod y cam cyn-archwilio.',
			paragraph9:
				'Mae {{-link}} ar gael sy’n cynnwys gwybodaeth i bobl neu sefydliadau sydd eisiau lleisio’u barn am brosiect seilwaith cenedlaethol.',
			paragraph9LinkText: 'canllaw'
		});
	});
});
