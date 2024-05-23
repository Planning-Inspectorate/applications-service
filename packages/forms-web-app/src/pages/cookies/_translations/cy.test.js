const cyCookiesTranslations = require('./cy.json');

describe('pages/cookies/_translations/cy', () => {
	it('should return the Welsh cookies page translations', () => {
		expect(cyCookiesTranslations).toEqual({
			heading1: 'Cwcis ar y gwasanaeth ymgeisio',
			paragraph1:
				"Ffeiliau sy'n cael eu harbed ar eich ffôn, eich llechen neu eich cyfrifiadur pan fyddwch yn ymweld â gwefan yw cwcis. Rydym yn defnyddio cwcis i storio gwybodaeth am y ffordd rydych yn defnyddio'r gwasanaeth ymgeisio, fel y tudalennau yr ymwelwch â nhw.",
			heading2: 'Gosodiadau cwcis',
			paragraph2: 'Rydym yn defnyddio gwahanol fathau o gwcis.',
			paragraph3:
				"Gallwch ddewis pa gwcis rydych yn fodlon i ni eu defnyddio a sut mae'r data'n cael ei rannu.",
			heading3: 'Cwcis cwbl angenrheidiol',
			paragraph4:
				"Rydym yn defnyddio cwcis hanfodol i'ch helpu i ddefnyddio'r gwasanaeth ymgeisio. Mae'r rhain yn gwneud pethau fel:",
			listItem1: "cofio'ch cynnydd trwy ein gwasanaeth",
			listItem2: 'cofio eich bod wedi gweld y neges ynghylch cwcis',
			paragraph5:
				"Mae angen i'r cwcis hyn gael eu derbyn isod er mwyn rhoi'r profiad gorau i chi wrth ddefnyddio'r gwasanaeth.",
			heading4: "Cwcis a ddefnyddir i wella'r gwasanaeth ymgeisio",
			paragraph6:
				"Rydym yn defnyddio Google Analytics i fesur sut rydych yn defnyddio'r gwasanaeth ymgeisio fel y gallwn ei wella yn seiliedig ar anghenion defnyddwyr. Nid ydym yn caniatáu i Google ddefnyddio na rhannu'r data am y ffordd rydych yn defnyddio'r safle hwn.",
			paragraph7:
				"Rydych yn cytuno i'r Arolygiaeth Gynllunio ddefnyddio eich data i helpu i wella'r gwasanaeth ymgeisio.",
			legend1: 'Ydych chi eisiau derbyn cwcis dadansoddi?',
			successBanner: {
				heading1: 'Arbedwyd eich gosodiadau cwcis',
				paragraph1:
					"Fe allai gwasanaethau'r llywodraeth osod cwcis ychwanegol ac, os felly, bydd ganddynt eu polisi a'u banner cwcis eu hunain.",
				linkText1: "Dychwelyd i'r dudalen yr oeddech yn edrych arni"
			},
			errorMessage: {
				paragraph1: '',
				listItem1: '',
				listItem2: ''
			}
		});
	});
});
