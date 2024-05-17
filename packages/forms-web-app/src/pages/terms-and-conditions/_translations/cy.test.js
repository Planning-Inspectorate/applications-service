const cyTermsAndConditionsTranslations = require('./cy.json');

describe('pages/terms-and-conditions/_translations/cy', () => {
	it('should return the Welsh terms and conditions page translations', () => {
		expect(cyTermsAndConditionsTranslations).toEqual({
			common: {
				linkText1: 'Prosiectau Seilwaith Cenedlaethol',
				linkText2: 'Brosiectau Seilwaith Cenedlaethol',
				linkText3: 'cysylltwch â ni',
				linkText4: 'Cysylltwch â ni'
			},
			introduction: {
				heading1: 'Telerau ac amodau',
				paragraph1:
					"Mae'r dudalen hon ac unrhyw dudalennau y mae'n cysylltu â nhw yn esbonio telerau defnydd {{-link}}.",
				paragraph2: "Mae'n rhaid i chi gytuno â'r rhain i ddefnyddio {{-link}}.",
				linkText1: 'Prosiectau Seilwaith Cenedlaethol'
			},
			whoWeAre: {
				heading1: 'Pwy ydym ni',
				paragraph1: 'Mae {{-link}} yn cael ei weithredu gan yr Arolygiaeth Gynllunio.',
				paragraph2: "Mae'r Arolygiaeth Gynllunio yn asiantaeth y llywodraeth.",
				paragraph3: 'Os oes gennych gwestiynau am ein gwasanaeth, {{-link}}.'
			},
			usingNIP: {
				heading1: 'Defnyddio Prosiectau Seilwaith Cenedlaethol',
				paragraph1:
					"Rydych yn cytuno i ddefnyddio {{-link}} at ddibenion cyfreithlon yn unig. Mae'n rhaid i chi hefyd ei ddefnyddio mewn ffordd nad yw'n torri hawliau unrhyw un arall i ddefnyddio'r safle hwn nac yn rhwystro na chyfyngu ar ei ddefnydd a'i fwynhad ohono.",
				paragraph2:
					"Rydym yn diweddaru {{-link}} drwy'r amser. Gallwn newid neu ddileu cynnwys unrhyw bryd heb roi rhybudd."
			},
			servicesAndTransactions: {
				heading1: 'Gwasanaethau a thrafodion',
				paragraph1:
					"Gallwch ddefnyddio {{-link}} i gael mynediad at wasanaethau a thrafodion y llywodraeth, er enghraifft 'cofrestru i leisio'ch barn'."
			},
			linkingToNIP: {
				heading1: 'Darparu dolenni i Brosiectau Seilwaith Cenedlaethol',
				paragraph1:
					'Rydym yn croesawu ac yn annog gwefannau eraill i ddarparu dolenni i {{-link}}.',
				paragraph2: 'Fodd bynnag, ni fyddwn yn rhoi caniatâd:',
				listItem1:
					'i godi tâl ar ddefnyddwyr eich gwefan i glicio ar ddolen i unrhyw un o dudalennau {{-link}}',
				listItem2:
					"i ddweud bod eich gwefan yn gysylltiedig â {{-link}} neu'n cael ei chefnogi ganddo ef neu unrhyw adran neu asiantaeth arall o'r llywodraeth",
				listItem2LinkText: 'Phrosiectau Seilwaith Cenedlaethol'
			},
			linkingFromNIP: {
				heading1: 'Darparu dolenni o Brosiectau Seilwaith Cenedlaethol',
				paragraph1:
					"Mae {{-link}} yn darparu dolenni i wefannau sy'n cael eu rheoli gan adrannau ac asiantaethau eraill y llywodraeth, darparwyr gwasanaethau neu sefydliadau eraill. Nid oes gennym unrhyw reolaeth dros gynnwys y gwefannau hyn.",
				paragraph2: 'Nid ydym yn gyfrifol am:',
				listItem1: "ddiogelu unrhyw wybodaeth a roddwch i'r gwefannau hyn",
				listItem2:
					"unrhyw golled neu ddifrod a allai ddeillio o'ch defnydd o'r gwefannau hyn, neu unrhyw wefannau eraill maen nhw'n darparu dolenni iddynt",
				paragraph3:
					"Rydych yn cytuno i'n rhyddhau o unrhyw hawliadau neu anghydfodau a allai ddeillio o ddefnyddio'r gwefannau hyn.",
				paragraph4:
					"Dylech ddarllen yr holl delerau ac amodau, polisïau preifatrwydd a thrwyddedau defnyddwyr sy'n ymwneud â'r gwefannau hyn cyn i chi eu defnyddio."
			},
			usingNIPContent: {
				heading1: 'Defnyddio cynnwys Prosiectau Seilwaith Cenedlaethol',
				phrase1: "Mae'r rhan fwyaf o'r cynnwys ar {{-link}}",
				phrase2: 'yn destun {{-link}}',
				phrase2LinkText: 'amddiffyniad hawlfraint y Goron',
				phrase3: 'a chaiff ei gyhoeddi o dan y {{-link}} (OGL).',
				phrase3LinkText: 'Drwydded Llywodraeth Agored',
				paragraph1: "Mae rhywfaint o gynnwys wedi'i eithrio o'r OGL – gwiriwch y {{-link}}.",
				paragraph1LinkText: 'rhestr eithriadau',
				paragraph2:
					"Mae logos ac arwyddluniau adrannol wedi'u heithrio o'r OGL hefyd, heblaw pan fyddant yn rhan annatod o ddogfen neu set ddata.",
				paragraph3:
					"Os oes unrhyw gynnwys nad yw'n destun amddiffyniad hawlfraint y Goron neu'n cael ei gyhoeddi o dan yr OGL, byddwn yn cydnabod yr awdur neu'r deiliad hawlfraint, fel arfer.",
				paragraph4:
					'Nid ydym yn awdurdodi defnyddio neu ailgyhoeddi dogfennau trydydd parti heb ganiatâd y deiliad eiddo deallusol gwreiddiol.',
				paragraph5:
					'Mae hyn yn cynnwys yr holl ddeunydd nad yw {{-link}} yn berchen arno, gan gynnwys hwnnw a grëwyd gan ymgeiswyr, partïon â buddiant neu grwpiau â diddordeb.',
				paragraph6:
					'Os oes gennych gwestiynau am ailgyhoeddi unrhyw gynnwys ar ein gwasanaeth, {{-link}}.',
				paragraph7:
					"{{-link}} os hoffech atgynhyrchu darn o gynnwys ond nad ydych yn siŵr a yw'n destun hawlfraint y Goron neu'r OGL.",
				paragraph8:
					"Rydym yn sicrhau bod y rhan fwyaf o'r cynnwys ar {{-link}} ar gael trwy ffrydiau i'w defnyddio gan wefannau a chymwysiadau eraill. Nid ein cynhyrchion ni yw'r gwefannau a'r cymwysiadau sy'n defnyddio ein ffrydiau, ac mae'n bosibl y byddant yn defnyddio fersiynau o'n cynnwys sydd wedi cael eu golygu a'u storio i'w defnyddio'n ddiweddarach ('eu storio').",
				paragraph9:
					"Nid ydym yn rhoi unrhyw sicrwydd, amodau na gwarantau ynglŷn â chywirdeb neu gyflawnrwydd unrhyw gynnwys a ddefnyddir gan y cynhyrchion hyn. Nid ydym yn atebol am unrhyw golled neu ddifrod a allai ddeillio o'ch defnydd o'r cynhyrchion hyn.",
				paragraph10: "Bydd y fersiwn fwyaf cyfredol o'n cynnwys ar {{-link}} bob amser."
			},
			disclaimer: {
				heading1: 'Ymwadiad',
				paragraph1:
					"Nid yw'r adran hon yn lleihau nac yn dileu ein cyfrifoldebau na hawliau pobl yn ymwneud â diogelu data mewn unrhyw ffordd.",
				paragraph2:
					'Er y gwnawn bob ymdrech i gadw {{-link}} yn gyfredol, nid ydym yn rhoi unrhyw sicrwydd, amodau na gwarantau y bydd y wybodaeth:',
				listItem1: 'yn gyfredol',
				listItem2: 'yn ddiogel',
				listItem3: 'yn gywir',
				listItem4: 'yn gyflawn',
				listItem5: 'yn rhydd rhag bygiau neu feirysau',
				paragraph3:
					'Nid ydym yn cyhoeddi cyngor ar {{-link}}. Dylech gael cyngor proffesiynol neu arbenigol cyn gwneud unrhyw beth ar sail y cynnwys.',
				paragraph4:
					'Nid ydym yn atebol am unrhyw golled neu ddifrod a allai ddeillio o ddefnyddio {{-link}}. Mae hyn yn cynnwys:',
				listItem6: 'unrhyw golledion uniongyrchol, anuniongyrchol neu ganlyniadol',
				listItem7:
					"unrhyw golled neu ddifrod a achoswyd gan gamweddau sifil ('camweddau', gan gynnwys esgeuluster), tor contract neu fel arall",
				listItem8:
					"defnyddio {{-link}} ac unrhyw wefannau y mae'n cynnwys dolenni iddynt neu wefannau sy'n cynnwys dolenni iddo",
				listItem9:
					"anallu i ddefnyddio {{-link}} ac unrhyw wefannau y mae'n cynnwys dolenni iddynt neu wefannau sy'n cynnwys dolenni iddo",
				paragraph5:
					"Mae hyn yn berthnasol os oedd y golled neu'r difrod yn rhagweladwy, wedi digwydd yn ôl y drefn arferol neu os rhoddoch wybod i ni y gallai ddigwydd.",
				paragraph6: 'Mae hyn yn cynnwys (ymhlith pethau eraill) colli eich:',
				listItem10: 'incwm neu refeniw',
				listItem11: 'cyflog, budd-daliadau neu daliadau eraill',
				listItem12: 'busnes',
				listItem13: 'elw neu gontractau',
				listItem14: 'cyfle',
				listItem15: 'arbedion disgwyliedig',
				listItem16: 'data',
				listItem17: 'ewyllys da neu enw da',
				listItem18: 'eiddo diriaethol',
				listItem19:
					'eiddo anniriaethol, gan gynnwys colli, llygru neu ddifrodi data neu unrhyw system gyfrifiadurol',
				listItem20: 'gwastraffu amser rheoli neu swyddfa',
				paragraph7: 'Fe allem fod yn atebol am y canlynol o hyd:',
				listItem21: "marwolaeth neu anaf personol sy'n deillio o'n hesgeuluster",
				listItem22: 'camliwio twyllodrus',
				listItem23:
					'unrhyw atebolrwydd arall na ellir ei eithrio neu ei gyfyngu o dan y gyfraith gymwys'
			},
			requestsToRemoveContent: {
				heading1: 'Ceisiadau i ddileu cynnwys',
				paragraph1:
					'Gallwch ofyn am gael dileu cynnwys o {{-link}}. Sylwch fod y broses Seilwaith Cenedlaethol yn cael ei llywodraethu gan egwyddor bod yn agored. Os byddwch yn gofyn am gael dileu cynnwys, er mwyn tegwch, ni fydd yn cael ei ystyried gan yr Awdurdod Archwilio, fel arfer.',
				paragraph2: 'Byddwn yn dileu cynnwys:',
				listItem1:
					"er mwyn cydymffurfio â deddfwriaeth diogelu data sy'n ymwneud â hawliau a rhyddidau unigolion",
				listItem2:
					"os yw'n torri deddfau hawlfraint, yn cynnwys data personol sensitif neu ddeunydd y gellid ystyried ei fod yn anweddus neu'n ddifenwol",
				paragraph3:
					"{{-link}} i ofyn am gael dileu cynnwys. Bydd angen i chi anfon cyfeiriad gwe (URL) y cynnwys atom ac esbonio pam y dylid ei ddileu, yn eich barn chi. Byddwn yn ymateb i roi gwybod i chi p'un a fyddwn yn ei ddileu.",
				paragraph4:
					"Byddwn yn dileu cynnwys yn ôl ein disgresiwn mewn trafodaeth â'r adran neu'r asiantaeth sy'n gyfrifol amdano. Gallwch ofyn am wybodaeth o hyd o dan y {{-link}}",
				paragraph4LinkText: 'Ddeddf Rhyddid Gwybodaeth',
				phrase1: "a'r {{-link}}.",
				phrase1LinkText: 'Ddeddf Diogelu Data'
			},
			informationAboutYou: {
				heading1: "Gwybodaeth amdanoch chi a'ch ymweliadau â Phrosiectau Seilwaith Cenedlaethol",
				phrase1: "Rydym yn casglu gwybodaeth amdanoch yn unol a'n {{-link}}",
				phrase1LinkText: 'polisi preifatrwydd',
				phrase2: "â'n {{-link}}.",
				phrase2LinkText: 'polisi cwcis',
				paragraph1:
					"Trwy ddefnyddio Prosiectau Seilwaith Cenedlaethol, rydych yn cytuno i ni gasglu'r wybodaeth hon ac yn cadarnhau bod unrhyw ddata a roddwch yn gywir."
			},
			virusProtection: {
				heading1: 'Diogelu rhag feirysau',
				paragraph1:
					'Rydym yn gwneud pob ymdrech i wirio a phrofi {{-link}} am feirysau ar bob cam cynhyrchu.',
				paragraph2:
					"Mae'n rhaid i chi wneud yn siŵr nad yw'r ffordd rydych yn defnyddio {{-link}} yn eich gwneud yn agored i risg feirysau, cod cyfrifiadurol maleisus neu fathau eraill o ymyrraeth sy'n gallu niweidio'ch system gyfrifiadurol.",
				paragraph3:
					"Nid ydym yn gyfrifol am unrhyw golled, tarfu neu ddifrod i'ch data neu'ch system gyfrifiadurol a allai ddigwydd pan fyddwch yn defnyddio {{-link}}."
			},
			offences: {
				heading1: 'Feirysau, hacio a throseddau eraill',
				paragraph1:
					"Pan fyddwch yn defnyddio {{-link}}, mae'n rhaid i chi beidio â chyflwyno feirysau, feirysau Troea, mwydod, bomiau rhesymeg neu unrhyw ddeunydd arall sy'n faleisus neu'n dechnolegol niweidiol.",
				paragraph2:
					"Mae'n rhaid i chi beidio â cheisio cael mynediad heb ei awdurdodi at {{-link}}, y gweinydd y mae'n cael ei storio arno nac unrhyw weinydd, cyfrifiadur neu gronfa ddata sy'n gysylltiedig ag ef.",
				paragraph3:
					"Mae'n rhaid i chi beidio ag ymosod ar {{-link}} mewn unrhyw ffordd. Mae hyn yn cynnwys ymosodiadau atal gwasanaeth.",
				paragraph4:
					"Byddwn yn rhoi gwybod i'r awdurdodau priodol sy'n gorfodi'r gyfraith am unrhyw ymosodiadau neu geisiadau i gael mynediad heb ei awdurdodi at {{-link}} ac yn rhannu gwybodaeth amdanoch gyda nhw."
			},
			governingLaw: {
				heading1: 'Y gyfraith lywodraethol',
				paragraph1:
					"Mae'r telerau ac amodau hyn yn cael eu llywodraethu gan ddeddfau Cymru a Lloegr a chânt eu dehongli yn unol â nhw.",
				paragraph2:
					"Bydd unrhyw anghydfod sydd gennych sy'n ymwneud â'r telerau ac amodau hyn, neu'ch defnydd o {{-link}} (boed hynny'n gytundebol neu'n anghytundebol), yn ddarostyngedig i awdurdodaeth lwyr llysoedd Cymru a Lloegr."
			},
			general: {
				heading1: 'Cyffredinol',
				paragraph1:
					"Fe allai fod hysbysiadau cyfreithiol mewn mannau eraill ar {{-link}} sy'n ymwneud â sut rydych yn defnyddio'r safle.",
				paragraph2:
					"Ni fyddwn yn atebol os na fyddwn yn cydymffurfio â'r telerau ac amodau hyn oherwydd amgylchiadau sydd y tu hwnt i'n rheolaeth resymol.",
				paragraph3:
					"Efallai y byddwn yn penderfynu peidio ag arfer neu orfodi unrhyw hawl sydd ar gael i ni o dan y telerau ac amodau hyn. Gallwn bob amser benderfynu arfer neu orfodi'r hawl honno'n ddiweddarach.",
				paragraph4:
					"Ni fydd gwneud hyn unwaith yn golygu y byddwn yn ildio'r hawl yn awtomatig ar unrhyw achlysur arall.",
				paragraph5:
					"Os bernir bod unrhyw un o'r telerau ac amodau hyn yn annilys, yn anorfodadwy neu'n anghyfreithlon am unrhyw reswm, bydd y telerau ac amodau sy'n weddill yn berthnasol o hyd."
			},
			changesToTerms: {
				heading1: "Newidiadau i'r telerau ac amodau hyn",
				paragraph1:
					'Gwiriwch y telerau ac amodau hyn yn rheolaidd. Gallwn eu diweddaru unrhyw bryd heb roi rhybudd.',
				paragraph2:
					"Byddwch yn cytuno ag unrhyw newidiadau os byddwch yn parhau i ddefnyddio Prosiectau Seilwaith Cenedlaethol ar ôl i'r telerau ac amodau gael eu diweddaru.",
				paragraph3: 'Diweddarwyd ddiwethaf 20 Mawrth 2024.'
			}
		});
	});
});
