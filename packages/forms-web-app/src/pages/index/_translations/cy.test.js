const cyIndexTranslations = require('./cy.json');

describe('pages/index/_translations/cy', () => {
	it('should return the welsh index page translations', () => {
		expect(cyIndexTranslations).toEqual({
			heading1: 'Croeso i Gynllunio Seilwaith Cenedlaethol',
			heading2: "Rwy'n chwilio am brosiect",
			heading3: 'Rwyf eisiau gweld yr holl brosiectau',
			heading4: 'Gwybodaeth ar gyfer y cyhoedd',
			heading5: 'Gwybodaeth ar gyfer defnyddwyr proffesiynol',
			heading6: 'Diweddariadau a gwybodaeth gyswllt',
			linkParagraph1: "Gallwch weld y camau y mae cais yn mynd trwyddynt, o'r dechrau i'r diwedd.",
			linkParagraph2:
				'Dysgwch bopeth y mae angen i chi ei wybod am rannu eich safbwyntiau ar brosiect.',
			linkParagraph3:
				'Dewch o hyd i nodiadau cyngor, deddfwriaeth berthnasol a datganiadau polisi cenedlaethol.',
			linkParagraph4:
				"Os ydych eisiau adeiladu datblygiad newydd, dyma'r hyn y mae angen i chi ei wybod cyn dechrau.",
			linkParagraph5: 'Sut i gysylltu â ni.',
			linkTitle1: 'Gweld y broses',
			linkTitle2: "Sut i leisio'ch barn am brosiect",
			linkTitle3: 'Gweld gwybodaeth fanwl',
			linkTitle4: 'Gweld y broses o gyflwyno prosiect',
			linkTitle5: 'Mae arnaf angen cymorth',
			paragraph1:
				"Mae rhagor o wybodaeth ar gael yma ynglŷn â Phrosiectau Seilwaith o Arwyddocâd Cenedlaethol (NSIPau). Prosiectau mawr yw'r rhain fel gorsafoedd pŵer, priffyrdd a llinellau pŵer. Maen nhw'n cael eu trin ar wahân i gynllunio awdurdod lleol arferol oherwydd eu maint a'u pwysigrwydd i gymunedau ehangach.",
			paragraph2:
				"Mae'r safle hwn yn cael ei reoli gan yr Arolygiaeth Gynllunio, sef asiantaeth y llywodraeth sy'n gyfrifol am archwilio ceisiadau ar y raddfa hon yng Nghymru a Lloegr.",
			paragraph3:
				'This is a new service. If you are visiting for information on a Welsh project, visit our {{-link}}.',
			paragraph3LinkText: 'old website',
			paragraph4: 'Brig y Ffurflen',
			paragraph5: 'Gweld {{-link}}',
			paragraph5LinkText: "rhestr lawn o'r holl brosiectau",
			linkTitle6: 'Gweld y newyddion diweddaraf',
			linkParagraph6: 'Gweld y newyddion NSIP diweddaraf.'
		});
	});
});
