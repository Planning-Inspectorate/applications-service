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
