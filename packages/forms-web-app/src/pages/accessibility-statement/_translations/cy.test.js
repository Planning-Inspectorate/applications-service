const enAccessibilityStatementTranslations = require('./cy.json');

describe('pages/accessibility-statement/_translations/cy', () => {
	it('should return the welsh accessibility statement page translations', () => {
		expect(enAccessibilityStatementTranslations).toEqual({
			heading1: 'Datganiad hygyrchedd ar gyfer prosiectau seilwaith cenedlaethol',
			paragraph1: "Mae'r datganiad hygyrchedd hwn yn berthnasol i",
			heading2: "Defnyddio'r gwasanaeth hwn",
			paragraph2:
				"Mae'r wefan hon yn cael ei chynnal gan yr Arolygiaeth Gynllunio. Rydym eisiau i gynifer o bobl â phosibl ddefnyddio'r wefan hon. Er enghraifft, mae hyn yn golygu y dylech allu:",
			listItem1: 'newid lliwiau, lefelau cyferbynnedd a ffontiau',
			listItem2: "chwyddo i mewn hyd at 300% heb i'r testun ddiflannu oddi ar y sgrin",
			listItem3: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
			listItem4: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
			listItem5:
				"gwrando ar y rhan fwyaf o'r wefan gan ddefnyddio rhaglen darllen sgrin (gan gynnwys fersiynau diweddaraf JAWS, NVDA a VoiceOver)",
			paragraph3: 'Rydym hefyd wedi gwneud y testun mor hawdd â phosibl ei ddeall.',
			paragraph4:
				'Mae {{-link}} yn cynnig cyngor ar wneud eich dyfais yn haws ei defnyddio os oes gennych anabledd.',
			paragraph4LinkText: 'AbilityNet',
			heading3: "Pa mor hygyrch yw'r wefan hon",
			paragraph5: "Mae'r gwasanaeth hwn yn cydymffurfio'n rhannol â safon AA y {{-link}}.",
			paragraph5LinkText: 'Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1.',
			paragraph6: "Rydym yn gwybod nad yw rhai rhannau o'r wefan hon yn gwbl hygyrch:",
			listItem6: "nid yw rhai tudalennau a dogfennau atodedig wedi'u hysgrifennu mewn iaith glir",
			listItem7: 'mae llawer o ddogfennau mewn fformat PDF ac nid ydynt yn hygyrch',
			listItem8: 'fe allai fod rhai dolenni nad ydynt yn rhoi digon o gyd-destun',
			listItem9:
				"fe allai rhai rhannau o'r safle fod yn anodd eu llywio i bobl sy'n defnyddio technoleg gynorthwyol",
			paragraph7:
				"Mae'r adran isod ar statws cydymffurfio yn rhoi mwy o fanylion am y rhannau o'r safle nad ydynt yn gwbl hygyrch.",
			heading4: 'Adborth a gwybodaeth gyswllt',
			paragraph8:
				'Os oes arnoch angen gwybodaeth ar y wefan hon mewn fformat gwahanol fel PDF hygyrch, print bras, fersiwn hawdd ei darllen, recordiad sain neu braille:',
			listItem10: 'Anfonwch neges e-bost at:',
			listItem11: 'Ffoniwch:',
			paragraph9: 'Byddwn yn ystyried eich cais ac yn cysylltu â chi ymhen 10 niwrnod gwaith.',
			heading5: "Adrodd am broblemau hygyrchedd â'r gwasanaeth hwn",
			paragraph10:
				"Rydym bob amser yn ceisio gwella hygyrchedd y wefan hon. Os dewch ar draws unrhyw broblemau nad ydynt wedi'u rhestru ar y dudalen hon neu os ydych yn credu nad ydym yn bodloni ein gofynion hygyrchedd, anfonwch neges e-bost atom:",
			heading6: 'Gweithdrefn orfodi',
			paragraph11:
				'Os byddwch yn cysylltu â ni gyda chwyn ac yn anfodlon ar ein hymateb, {{-link}}.',
			paragraph11LinkText: "cysylltwch â'r Gwasanaeth Cynghori a Chymorth Cydraddoldeb (EASS)",
			paragraph12:
				"Mae'r Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) yn gyfrifol am orfodi Rheoliadau Hygyrchedd Cyrff Sector Cyhoeddus (Gwefannau a Chymwysiadau Symudol) (Rhif 2) 2018 (y 'rheoliadau hygyrchedd').",
			heading7: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
			paragraph13:
				"Mae'r Arolygiaeth Gynllunio wedi ymrwymo i wneud ei gwefannau'n hygyrch, yn unol â Rheoliadau Hygyrchedd Cyrff Sector Cyhoeddus (Gwefannau a Chymwysiadau Symudol) (Rhif 2) 2018.",
			heading8: 'Statws cydymffurfio',
			paragraph14:
				"Mae'r wefan hon yn cydymffurfio'n rhannol â safon AA y Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1. Rhestrir yr achosion o ddiffyg cydymffurfio isod.",
			heading9: "Cynnwys nad yw'n hygyrch",
			paragraph15: "Mae'r cynnwys a restrir isod yn anhygyrch am y rhesymau canlynol.",
			heading10: "Diffyg cydymffurfio â'r rheoliadau hygyrchedd",
			listItem12:
				"Arsylwyd os yw defnyddiwr yn llywio'r dudalen gan ddefnyddio meddalwedd Dragon Naturally Speaking, nid yw'n gallu ehangu'r wybodaeth ychwanegol yn yr elfennau manylion Gwybodaeth am y Prosiect. Nid yw hyn yn cydymffurfio â Lefel A: 4.1.2 Enw, Rôl, Gwerth y Canllawiau Hygyrchedd Cynnwys Gwe (WCAG) 2.1. Mae angen i'r mater hwn gael ei ddatrys yn Dragon Naturally Speaking. Yn lle hynny, gall defnyddwyr ddefnyddio MouseGrid, sef nodwedd yn ap Adnabod Llais Windows.",
			listItem13:
				"Os yw defnyddiwr yn llywio'r dudalen gan ddefnyddio iOS VoiceOver, ni roddir gwybod i'r defnyddiwr fod gwybodaeth ychwanegol nad yw wedi cael ei hehangu ar y sgrin. Oherwydd hyn, ni fyddai'r defnyddiwr yn gwybod bod mwy o wybodaeth i'w chlywed o fewn yr elfennau Gwybodaeth am y Prosiect. Os yw'r defnyddiwr yn clicio ar yr adran i'w hehangu, nid oes cyhoeddiad i ddweud bod hyn wedi digwydd. Nid yw hyn yn cydymffurfio â Lefel A: Enw, Rôl, Gwerth WCAG. 2.1.",
			listItem14:
				"I'r rhai sy'n defnyddio technoleg gynorthwyol, mae'r gallu i lanlwytho ffeiliau gan ddefnyddio meddalwedd Dragon Naturally Speaking yn methu. Nid yw hyn yn cydymffurfio â Lefel A: 4.1.2 Enw, Rôl, Gwerth WCAG 2.1.",
			heading11: 'Dogfennau PDF a dogfennau nad ydynt yn HTML',
			paragraph16:
				"Nid yw llawer o ddogfennau'n hygyrch mewn nifer o ffyrdd, gan gynnwys testun amgen ar goll a strwythur dogfen ar goll. Er enghraifft, efallai nad ydynt wedi'u strwythuro fel eu bod yn hygyrch i raglen darllen sgrin. Nid yw hyn yn bodloni maen prawf llwyddo 4.1.2 WCAG 2.1. Mae rhai o'n dogfennau PDF a Word yn hanfodol i ddarparu ein gwasanaethau. Er enghraifft, mae gennym ddogfennau PDF sy'n cynnwys gwybodaeth am sut gall defnyddwyr gael at ein gwasanaethau, a ffurflenni wedi'u cyhoeddi fel dogfennau Word.",
			listItem15: "nid yw rhai o'n dogfennau PDF yn hygyrch gan nad ydynt wedi'u tagio'n briodol",
			listItem16:
				'mae rhai dogfennau PDF, Word ac Excel yn methu maen prawf canfyddadwy ac ymarferol WCAG2',
			listItem17:
				"mae rhai o'n dogfennau'n cynnwys diagramau. Nid oes testun amgen ar gyfer y delweddau hyn",
			listItem18:
				"mae rhai o'r dogfennau a gyhoeddwn yn cael eu cynhyrchu gan drydydd parti. Nid ydym bob amser yn gallu sicrhau bod y rhain yn cydymffurfio'n llwyr",
			paragraph17:
				"Darllenwch {{-link}} y sefydliad a gyhoeddodd y ddogfen i adrodd am unrhyw broblemau neu ofyn am ddogfennau mewn fformat amgen. Os oes mwy nag un sefydliad wedi'i restru, darllenwch bolisi dogfen hygyrch yr un cyntaf.",
			paragraph17LinkText: 'bolisi dogfen hygyrch',
			paragraph18: "Ceisiwn ddatrys y rhain cyn gynted ag y gallwn, lle y bo'n bosibl.",
			heading12: 'Cynnwys nad yw o fewn cwmpas y rheoliadau hygyrchedd',
			heading13: 'Dogfennau PDF a dogfennau eraill',
			paragraph19:
				"Mae rhai o'n dogfennau PDF a Word yn hanfodol i ddarparu ein gwasanaethau. Er enghraifft, mae gennym ddogfennau PDF sy'n cynnwys gwybodaeth am sut gall defnyddwyr gael at ein gwasanaethau, a ffurflenni wedi'u cyhoeddi fel dogfennau Word.",
			paragraph20: '{{-link}} os nad ydynt yn hanfodol i ddarparu ein gwasanaethau.',
			paragraph20LinkText:
				"Nid yw'r rheoliadau hygyrchedd yn mynnu ein bod yn cywiro dogfennau PDF na dogfennau eraill a gyhoeddwyd cyn 23 Medi 2018",
			heading14: "Paratoi'r datganiad hygyrchedd hwn",
			paragraph21:
				"Lluniwyd adroddiad hygyrchedd ar y gwasanaeth ym mis Hydref 2023. Paratowyd y datganiad hwn ac fe'i hadolygwyd ddiwethaf ar 8 Tachwedd 2023. Mae'r gwasanaeth hwn yn cael ei brofi'n fisol o leiaf gan y tîm sy'n ei gynnal, ac yn gyfnodol gan gyrff allanol."
		});
	});
});
