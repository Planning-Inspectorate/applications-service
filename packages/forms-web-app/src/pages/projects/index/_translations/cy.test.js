const cyProjectsIndexTranslations = require('./cy.json');

describe('pages/projects/index/_translations/cy', () => {
	it('should return the welsh projects index translations', () => {
		expect(cyProjectsIndexTranslations).toEqual({
			heading1: 'Gwybodaeth am y prosiect',
			latestUpdateBanner: {
				latestUpdate: 'Diweddariad diweddaraf',
				viewAllUpdates: 'Gweld yr holl ddiweddariadau'
			},
			aboutProject: {
				heading1: "Ynglŷn â'r prosiect",
				paragraph1: 'Y math o gais:',
				paragraph2: "Enw'r ymgeisydd:",
				linkText1: 'Gweld gwefan y datblygwr'
			},
			projectStage: {
				heading1: 'Cam y prosiect',
				paragraph1: "Mae'r prosiect hwn ar y cam {{-stage}}."
			},
			projectLocation: {
				heading1: 'Lleoliad y prosiect'
			},
			getUpdates: {
				heading1: 'Cael diweddariadau',
				paragraph1: 'Rhowch eich cyfeiriad e-bost i gael:',
				listItem1: 'diweddariadau ar gynnydd y prosiect',
				listItem2: "gwybodaeth ynglŷn â sut i leisio'ch barn",
				listItem3: 'hysbysiadau pan fydd dogfennau allweddol yn cael eu cyhoeddi',
				paragraph2: 'Darllenwch yr {{-link}} i gael gwybod sut rydym yn trin eich gwybodaeth.',
				paragraph2LinkText: 'hysbysiad preifatrwydd'
			},
			contact: {
				heading1: 'Cysylltu â ni',
				heading2: 'Ffoniwch',
				paragraph1:
					'Os oes gennych rif parti â buddiant, cadwch ef wrth law pan fyddwch yn ffonio.',
				paragraph2: 'Rhif ffôn:',
				heading3: 'Anfonwch neges e-bost',
				paragraph3:
					"Pan fyddwch yn ysgrifennu neges e-bost, rhowch enw'r prosiect yn y llinell bwnc.",
				paragraph4: 'Ceisiwn ymateb o fewn 10 niwrnod gwaith.',
				heading4: 'Fformatau amgen',
				paragraph5:
					"Ffoniwch neu anfonwch neges e-bost i ofyn am ddogfennau'r prosiect mewn fformat amgen fel PDF, print bras, fersiwn hawdd ei darllen, recordiad sain neu braille."
			},
			getUpdates: {
				heading1: 'Cael diweddariadau',
				listItem1: 'diweddariadau ar gynnydd y prosiect',
				listItem2: "gwybodaeth ynglŷn â sut i leisio'ch barn",
				listItem3: 'hysbysiadau pan fydd dogfennau allweddol yn cael eu cyhoeddi',
				paragraph1: 'Rhowch eich cyfeiriad e-bost i gael:',
				paragraph2: 'Darllenwch yr {{-link}} i gael gwybod sut rydym yn trin eich gwybodaeth.',
				paragraph2LinkText: 'hysbysiad preifatrwydd'
			},
			heading1: 'Gwybodaeth am y prosiect',
			projectLocation: { heading1: 'Lleoliad y prosiect' },
			projectStage: {
				stage1name: 'cyn-ymgeisio',
				stage2name: 'derbyn',
				stage3name: 'cyn-archwilio',
				stage4name: 'archwilio',
				stage5name: 'argymhelliad.',
				stage6name: 'penderfyniad.',
				stage7name: 'ôl-benderfyniad.',
				heading1: 'Cam y prosiect',
				paragraph1: "Mae'r prosiect hwn ar y cam {{-stage}}.",
				preapplication: {
					paragraph1: "Disgwylir i'r cais gael ei gyflwyno {{-date}}.",
					paragraph2:
						"Pan fyddwn yn cael y cais, bydd gennym 28 niwrnod i benderfynu p'un ai ei dderbyn i'w archwilio.",
					paragraph3:
						"Os derbyniwn y cais, gallwch gofrestru i leisio'ch barn a gweld holl ddogfennau'r cais."
				},
				acceptance: {
					paragraph1:
						"Bydd y penderfyniad ynglŷn â ph'un ai derbyn y cais i'w archwilio yn cael ei wneud erbyn {{-date}}.",
					paragraph2: "Os derbynnir y cais, byddwn yn cyhoeddi'r canlynol:",
					listItem1: 'y penderfyniad derbyn',
					listItem2: 'y sylwadau ymgynghori a gafwyd gan y cynghorau lleol',
					paragraph3: 'Os na dderbynnir y cais, byddwn yn:',
					listItem3: "cyhoeddi'r rhesymau pam na chafodd ei dderbyn",
					listItem4: "dileu unrhyw ddogfennau a gyhoeddwyd o'r dudalen brosiect hon",
					paragraph4: 'Nid oes cyfle i wneud sylwadau ar y cais yn ystod y cam hwn.'
				},
				preexamination: {
					preReps: {
						paragraph1:
							"Yn ystod y cam hwn, gallwch {{-link}} am y prosiect arfaethedig. Bydd y dudalen hon yn cael ei diweddaru pan fydd y cyfnod cofrestru'n agor. Gallwch weld dogfennau cais y prosiect i gael gwybod mwy am y cais.",
						linkText1: "gofrestru i leisio'ch barn",
						linkText2: "Dysgwch fwy am gofrestru i leisio'ch barn."
					},
					repsOpen: {
						paragraph1:
							'Os ydych eisiau gwneud sylwadau ar y prosiect arfaethedig hwn, gallwch {{-link}}.',
						linkText1: "gofrestru i leisio'ch barn",
						paragraph2: "Bydd y cyfnod cofrestru'n cau ar {{-date}} am 23:59.",
						buttonText1: "Cofrestrwch i leisio'ch barn"
					},
					repsClosed: {
						paragraph1:
							"Mae'r cyfnod cofrestru i leisio'ch barn am y prosiect hwn wedi cau. Os nad ydych wedi cofrestru a'ch bod yn cyflwyno gwybodaeth yn ystod y cam archwilio, mae'n bosibl na fydd yn cael ei chynnwys.",
						paragraph2:
							'Cysylltwch â thîm achos y prosiect i gael gwybod mwy am sut i gymryd rhan os nad ydych wedi cofrestru.'
					},
					repsPublished: {
						paragraph1: "Rydym bellach wedi cyhoeddi'r holl sylwadau cofrestredig.",
						paragraph2: 'Gallwch {{-link}}.',
						linkText1: 'weld sylwadau gan bobl eraill sydd wedi cofrestru'
					},
					prelim: {
						paragraph1:
							'Bydd y cyfarfod rhagarweiniol ar gyfer y prosiect hwn yn cael ei gynnal ar: {{-date}}',
						paragraph2: 'Gallwch ddarllen y {{-link}} i gael gwybod sut i gymryd rhan.',
						linkText1: 'llythyr rheol 6',
						paragraph3:
							"Yn y cyfarfod hwn, bydd yr Awdurdod Archwilio'n esbonio sut bydd yn archwilio'r cais. Bydd hyn yn cynnwys amserlen yr archwiliad a'r materion y bydd yn canolbwyntio arnynt yn ystod yr archwiliad.",
						linkText2: 'Dysgwch fwy am gymryd rhan yn y cyfarfod rhagarweiniol'
					}
				},
				examination: {
					paragraph1:
						"Yn ystod y cam archwilio, gall unrhyw un sydd wedi cofrestru i leisio'i farn gyflwyno sylwadau erbyn y {{-link}}. Cewch fynychu gwrandawiadau hefyd, os cânt eu cynnal.",
					linkText1: 'terfynau amser a nodir yn amserlen yr archwiliad',
					paragraph2:
						'Gallwch hefyd {{-link}} i gael gwybod mwy am yr hyn y gallwch ei wneud yn ystod y cam archwilio.',
					linkText2: 'ddarllen y llythyr rheol 8',
					linkText3: "Dysgwch fwy am y cam archwilio'r cais",
					paragraph3: '{{-link}}.'
				},
				recommendation: {
					paragraph1: 'Y dyddiad a bennwyd ar gyfer cwblhau hyn yw {{-date}}'
				}
			},
			emailRequest: {
				paragraph1:
					"Efallai eich bod wedi ennill buddiant yn ddiweddar mewn tir y mae datblygiad yn effeithio arno. Os nad oedd y datblygwr wedi dweud wrthych fod y cais wedi cael ei dderbyn neu os na wnaethoch gofrestru i leisio'ch barn, gallwch ofyn am gael bod yn barti â buddiant o hyd.",
				paragraph2:
					"Mae angen i chi gysylltu â thîm y prosiect a fydd yn gofyn i'r Awdurdod Archwilio a allwch fod yn barti â buddiant a lleisio'ch barn.",
				paragraph3: 'Anfonwch neges e-bost at {{-link}} i ofyn am gael bod yn barti â buddiant.'
			},
			subsectors: {
				BC01: 'At Ddefnydd Swyddfa',
				BC02: 'Ymchwil a Datblygiad Cynnyrch neu Brosesau',
				BC03: 'Proses neu Brosesau Diwydiannol',
				BC04: 'Storio neu Ddosbarthu Nwyddau',
				BC05: 'Cynadleddau',
				BC06: 'Arddangosfeydd',
				BC07: 'Chwaraeon',
				BC08: 'Hamdden',
				BC09: 'Twristiaeth',
				EN01: 'Gorsafoedd Cynhyrchu',
				EN02: 'Llinellau Trydan',
				EN03: 'Cyfleusterau Storio Nwy Tanddaearol',
				EN04: 'Cyfleusterau Nwy Naturiol Hylifol (LNG)',
				EN05: 'Cyfleusterau Derbyn Nwy',
				EN06: 'Piblinellau Trawsgludo Nwy',
				EN07: 'Piblinellau Eraill',
				TR01: 'Priffyrdd',
				TR02: 'Meysydd Awyr',
				TR03: 'Cyfleusterau Harbwr',
				TR04: 'Rheilffyrdd',
				TR05: 'Cyfnewidfeydd Rheilffyrdd Cludo Nwyddau',
				WS01: 'Cyfleusterau Gwastraff Peryglus',
				WW01: 'Gweithfeydd Trin Dŵr Gwastraff',
				WA01: 'Argaeau a Chronfeydd Dŵr',
				WA02: 'Trosglwyddo Adnoddau Dŵr'
			},
			stageProgress: {
				notStarted: 'dim wedi dechrau',
				inProgress: 'mewn cynnydd',
				completed: 'wedi cwblhau'
			}
		});
	});
});
