const cyProcessGuideTranslations = require('./cy.json');

describe('pages/process-guide/_translations/cy', () => {
	it('should return the Welsh process guide page translations', () => {
		expect(cyProcessGuideTranslations).toEqual({
			applicationSummary: {
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
					'Mae’r broses ar gyfer ystyried p’un a ddylid rhoi caniatâd ar gyfer prosiect seilwaith cenedlaethol yn cynnwys sawl cam. Gall y broses gyfan gymryd tua 18 mis.'
			},
			haveYourSay: {
				heading2: 'Canllaw i bobl neu sefydliadau sydd eisiau lleisio’u barn',
				paragraph7:
					'Gall aelodau’r cyhoedd gymryd rhan mewn ymgynghoriadau cynnar cyn i gais gael ei gyflwyno trwy gysylltu â’r ymgeisydd yn uniongyrchol.',
				paragraph8:
					'Fel arall, gallwch gofrestru i leisio’ch barn ar y wefan hon yn ystod y cam cyn-archwilio.',
				paragraph9:
					'Mae {{-link}} ar gael sy’n cynnwys gwybodaeth i bobl neu sefydliadau sydd eisiau lleisio’u barn am brosiect seilwaith cenedlaethol.',
				paragraph9LinkText: 'canllaw'
			},
			preApplication: {
				subHeading1: 'Cyn-ymgeisio',
				paragraph10:
					'Dyma’r adeg pan fydd yr ymgeisydd yn dechrau creu ei gais. Mae’n ofynnol i’r ymgeisydd ymgynghori â phobl a sefydliadau yn yr ardal. Mae’n rhaid iddo hefyd greu dogfennau manwl ynglŷn â’r effaith y gallai’r prosiect ei chael ar yr amgylchedd.',
				paragraph11:
					'Mae’n bwysig cymryd rhan yn ystod y cam hwn er mwyn dylanwadu ar y cais cyn i’r ymgeisydd ei anfon at yr Arolygiaeth Gynllunio.',
				linkText1:
					'Dysgwch beth allwch chi ei wneud yn ystod y cam hwn a gwiriwch ein canllawiau manwl.'
			},
			acceptance: {
				subHeading2: 'Derbyn',
				paragraph12:
					'Dyma’r adeg pan fydd yr ymgeisydd yn anfon ei ddogfennau cais atom. Byddwn yn gwirio a allwn dderbyn y cais i’w archwilio. Mae gennym 28 niwrnod i wneud y penderfyniad hwn.',
				linkText2: 'Sut mae’r cam derbyn yn gweithio a beth fydd yn digwydd nesaf.'
			},
			preExamination: {
				subHeading3: 'Cyn-archwilio',
				paragraph13:
					'Penodir Awdurdod Archwilio sy’n cynnwys un neu fwy o arolygwyr. Mae’n rhaid i unrhyw un sydd eisiau lleisio’i farn allu cofrestru yn ystod y cam hwn.',
				paragraph14:
					'Mae’n rhaid i’r ymgeisydd gyhoeddi bod y cais wedi cael ei dderbyn gennym. Bydd yn cynnwys pryd a sut y gall partïon gofrestru i gymryd rhan. Mae’r cyfnod ar gyfer cofrestru’n cael ei osod gan yr ymgeisydd, ond mae’n rhaid iddo beidio â bod yn llai na 28 niwrnod.',
				paragraph15: 'Mae’r cam cyn-archwilio’n cymryd oddeutu 3 mis fel arfer.',
				linkText3: 'Beth sy’n digwydd yn ystod y cam cyn-archwilio.'
			},
			examination: {
				subHeading4: 'Archwiliad',
				paragraph16:
					'Bydd yr Awdurdod Archwilio’n gofyn cwestiynau am y datblygiad arfaethedig. Gall yr ymgeisydd ac unrhyw un sydd wedi cofrestru i leisio’i farn gymryd rhan a chyflwyno sylwadau erbyn pob terfyn amser yn yr amserlen. Gallwch hefyd fynychu gwrandawiadau a allai gael eu cynnal. Mae’r cam hwn yn cymryd hyd at 6 mis.',
				linkText4: 'Beth sy’n digwydd yn ystod y cam archwilio?'
			},
			recommendation: {
				subHeading5: 'Argymhelliad',
				paragraph17:
					'Mae’r Awdurdod Archwilio’n ysgrifennu ei adroddiad argymhelliad. Mae’n rhaid i hwn gael ei gwblhau a’i anfon at yr Ysgrifennydd Gwladol perthnasol o fewn 3 mis o ddiwedd y cam archwilio.',
				linkText5: 'Gwneud argymhelliad.'
			},
			decision: {
				subHeading6: 'Penderfyniad',
				paragraph18:
					'Y cam penderfynu yw’r adeg pan fydd yr Ysgrifennydd Gwladol perthnasol yn adolygu’r adroddiad ac yn gwneud y penderfyniad terfynol. Mae ganddo 3 mis i wneud penderfyniad.',
				linkText6: 'Pwy sy’n gwneud y penderfyniad terfynol.'
			},
			postDecision: {
				subHeading7: 'Beth sy’n digwydd ar ôl i’r penderfyniad gael ei wneud',
				paragraph19:
					'Pan fydd yr Ysgrifennydd Gwladol wedi gwneud penderfyniad, mae cyfnod o 6 wythnos pryd y gall pobl herio’r penderfyniad yn yr Uchel Lys. Yr enw ar hyn yw adolygiad barnwrol.',
				linkText7: 'Yr hyn y gallwch ei wneud ar ôl i’r penderfyniad gael ei wneud.'
			},
			buttons: {
				showAllButton: 'Dangos pob cam'
			}
		});
	});
});
