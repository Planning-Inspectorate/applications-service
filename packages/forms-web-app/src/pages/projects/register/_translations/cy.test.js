const cyRegisterTranslations = require('./cy.json');

describe('pages/projects/register/_translations/cy', () => {
	it('should return the Welsh register translations', () => {
		expect(cyRegisterTranslations).toEqual({
			index: {
				pageTitle:
					"Cofrestru i leisio'ch barn am brosiect seilwaith cenedlaethol - Cynllunio Seilwaith Cenedlaethol",
				pageHeading: "Cofrestru i leisio'ch barn am brosiect seilwaith cenedlaethol",
				open: {
					heading1: "Rydych yn cofrestru i leisio'ch barn ynghylch {{-project}}",
					paragraph1:
						"Defnyddiwch y gwasanaeth hwn i leisio'ch barn am brosiect seilwaith cenedlaethol. Mae arnom angen eich manylion personol a'ch sylwadau ynghylch {{-project}}.",
					heading2: "Ysgrifennu'ch sylwadau",
					paragraph2:
						"Mae'n rhaid i chi gynnwys sylwadau gyda'ch cofrestriad. Mae'n rhaid i'ch sylwadau ymwneud â'r prif faterion ac effeithiau, yn eich barn chi. Dylech gynnwys cymaint o fanylion â phosibl a sôn am unrhyw beth a allai effeithio ar eich bywyd beunyddiol.",
					paragraph3: 'Bydd y wybodaeth hon:',
					listItem1: 'yn cael ei gweld gan yr awdurdod archwilio',
					listItem2: 'yn cael ei chyhoeddi ar ein gwefan',
					paragraph4:
						"Gallwch gyflwyno mwy o sylwadau yn ystod yr archwiliad o'r cais pan fyddwch wedi cofrestru.",
					paragraph5: "Mae'n rhaid i chi gyflwyno'ch cofrestriad cyn 23:59 ar {{-date}}.",
					buttonText: 'Dechrau nawr',
					heading3: 'Cyn i chi ddechrau',
					heading4: "Os ydych yn cofrestru'ch hun fel unigolyn",
					paragraph6: 'Bydd arnoch angen:',
					listItem3: 'eich enw llawn',
					listItem4: 'eich cyfeiriad',
					listItem5: "eich cyfeiriad e-bost a'ch rhif ffôn",
					listItem6: "eich sylwadau cofrestru ynglŷn â'r prosiect",
					heading5:
						"Os ydych yn cofrestru ar ran sefydliad rydych yn gweithio neu'n gwirfoddoli iddo",
					paragraph7: 'Bydd arnoch angen:',
					listItem7: 'eich enw llawn',
					listItem8: "enw'r elusen neu'r sefydliad rydych yn gweithio iddi/iddo",
					listItem9: 'eich cyfeiriad gwaith',
					listItem10: 'email address and telephone number',
					listItem11: 'registration comments about the project',
					heading6: 'Os ydych yn cofrestru ar ran unigolyn neu sefydliad arall',
					paragraph8: 'Bydd arnoch angen:',
					listItem12: 'eich enw llawn',
					listItem13: 'eich cyfeiriad',
					listItem14: "eich cyfeiriad e-bost a'ch rhif ffôn",
					listItem15: "manylion yr unigolyn, yr aelwyd neu'r sefydliad rydych yn ei gynrychioli",
					listItem16: "ei sylwadau cofrestru ynglŷn â'r prosiect"
				},
				closed: {
					paragraph1: "Mae'r cyfnod amser i gofrestru i ddweud eich dweud wedi cau."
				}
			},
			registerFor: {
				pageTitle:
					"Ar ran pwy ydych chi'n cofrestru - Cofrestru i leisio'ch barn am brosiect seilwaith cenedlaethol - Cynllunio Seilwaith Cenedlaethol",
				pageHeading: "Ar ran pwy ydych chi'n cofrestru?",
				option1: 'Fi fy hun',
				option2: "Sefydliad rwyf yn gweithio neu'n gwirfoddoli iddo",
				option3: 'Ar ran unigolyn arall, aelwyd neu sefydliad nad wyf yn gweithio iddo'
			},
			whoRegisteringFor: {
				myself: 'Cofrestru i mi fy hun',
				organisation: 'Cofrestru ar gyfer sefydliad',
				agent: 'Cofrestru ar ran rhywun arall'
			},
			name: {
				pageHeading: "Beth yw'ch enw llawn?",
				hint: "<p>Byddwn yn cyhoeddi hwn ar y wefan ynghyd â'ch sylwadau ar y prosiect.</p><p>Mae'n rhaid i chi gofrestru fel unigolyn. Os yw'ch partner eisiau cofrestru, bydd rhaid iddo lenwi ffurflen ar wahân gyda'i fanylion.</p>"
			},
			areYou18: {
				pageHeading: "A ydych chi'n 18 oed neu'n hŷn?",
				hint: "Gallwch gofrestru i leisio'ch barn os ydych yn iau na 18 oed hefyd, ond byddwn yn prosesu'ch manylion personol mewn ffordd wahanol.",
				yesHiddenText: "rwyf yn 18 oed neu'n hŷn",
				noHiddenText: 'rwyf yn iau na 18 oed'
			},
			email: {
				pageHeading: "Beth yw'ch cyfeiriad e-bost?",
				hint: "Byddwn yn defnyddio'ch cyfeiriad e-bost i anfon gwybodaeth atoch am y prosiect hwn. Ni fyddwn yn cyhoeddi eich cyfeiriad e-bost."
			},
			address: {
				pageHeading: "Beth yw'ch cyfeiriad?",
				line1: "Llinell gyfeiriad 1<span class='govuk-visually-hidden'> o 3</span>",
				line2: "Llinell gyfeiriad 2<span class='govuk-visually-hidden'> o 3</span> (Dewisol)",
				line3: "Tref neu ddinas<span class='govuk-visually-hidden'> o 3</span> (Dewisol)",
				postcode: 'Cod post',
				country: 'Gwlad'
			},
			number: {
				pageHeading: "Beth yw'ch rhif ffôn?",
				hint: "Byddwn yn defnyddio'ch rhif ffôn i gysylltu â chi ynglŷn â'r prosiect os na allwn gysylltu â chi trwy e-bost. Ni fyddwn yn cyhoeddi eich rhif ffôn."
			},
			aboutProject: {
				pageHeading: 'Beth ydych chi eisiau ei ddweud wrthym am y prosiect arfaethedig hwn?',
				paragraph1:
					"Mae'n rhaid i chi gynnwys sylwadau gyda'ch cofrestriad. Mae'n rhaid i'ch sylwadau ymwneud â'r prif faterion ac effeithiau, yn eich barn chi. Dylech gynnwys cymaint o fanylion â phosibl a sôn am unrhyw beth a allai effeithio ar eich bywyd beunyddiol.",
				paragraph2: 'Bydd y wybodaeth hon:',
				listItem1: 'yn cael ei gweld gan yr Awdurdod Archwilio',
				listItem2: 'yn cael ei chyhoeddi ar ein gwefan',
				paragraph3:
					"Gallwch gyflwyno mwy o sylwadau yn ystod yr archwiliad o'r cais pan fyddwch wedi cofrestru.",
				textAreaLabel: 'Sylwadau cofrestru',
				details: {
					summaryText: 'Peidiwch â chynnwys y manylion hyn.',
					heading1: 'Defnydd o iaith, hyperddolenni a gwybodaeth sensitif',
					paragraph1:
						"Ni ddylech ddefnyddio iaith hiliol, ymfflamychol na difrïol, na chynnwys gwybodaeth sensitif (a elwir yn wybodaeth categori arbennig hefyd) amdanoch chi'ch hun neu bobl eraill yn eich sylwadau.",
					paragraph2:
						'Peidiwch â chynnwys dolenni i wefannau trydydd parti. Gallwch gynnwys dolenni i naill ai GOV.UK neu wefannau ar gyfer sefydliadau proffesiynol siartredig fel y Sefydliad Rheoli ac Asesu Amgylcheddol (IEMA).',
					heading2: 'Enghreifftiau o wybodaeth sensitif',
					paragraph3: 'Mae gwybodaeth sensitif yn cyfeirio at:',
					listItem1: 'sylwadau gan blant',
					listItem2: 'gwybodaeth yn ymwneud â phlant',
					listItem3: 'gwybodaeth yn ymwneud ag iechyd',
					listItem4: 'gwybodaeth yn ymwneud â throseddu',
					paragraph4:
						"Mae hefyd yn golygu unrhyw wybodaeth sy'n ymwneud â nodweddion canlynol unigolyn:",
					listItem5: 'hil',
					listItem6: 'tarddiad ethnig',
					listItem7: 'gwleidyddiaeth',
					listItem8: 'crefydd',
					listItem9: 'aelodaeth ag undeb llafur',
					listItem10: 'geneteg',
					listItem11: 'nodweddion corfforol',
					listItem12: 'bywyd rhywiol',
					listItem13: 'cyfeiriadedd rhywiol'
				}
			},
			checkYourAnswers: {
				pageHeading: 'Gwiriwch eich atebion cyn cofrestru',
				heading1: 'Manylion personol',
				registeringFor: "Ar ran pwy ydych chi'n cofrestru?",
				changeRegisteringForHiddenText: "ar ran pwy ydych chi'n cofrestru",
				myself: 'Fy hun',
				name: 'Enw llawn',
				changeNameHiddenText: 'eich enw llawn',
				areYou18: "A ydych chi'n 18 oed neu'n hŷn?",
				changeAreYou18HiddenText: "os ydych yn 18 oed neu'n hŷn",
				email: 'Cyfeiriad e-bost',
				changeEmailHiddenText: 'eich cyfeiriad e-bost',
				address: 'Cyfeiriad',
				changeAddressHiddenText: 'eich cyfeiriad',
				number: 'Rhif ffôn',
				changeNumberHiddenText: 'eich rhif ffôn',
				comments: 'Sylwadau cofrestru',
				changeCommentsHiddenText: 'sylwadau cofrestru'
			},
			declaration: {
				pageHeading: 'Datganiad',
				paragraph1:
					"Trwy gyflwyno'r ffurflen hon, rydych yn cofrestru i leisio'ch barn a rhoi eich sylwadau cofrestru i ni.",
				paragraph2:
					"Mae'n rhaid i'r Awdurdod Archwilio ystyried eich safbwyntiau pan fydd yn argymell a ddylai'r prosiect fynd ymlaen. Byddwn yn cysylltu â chi os bydd arnom angen mwy o wybodaeth am y sylwadau a roddwyd gennych ar y ffurflen gofrestru.",
				paragraph3: "Rydych yn cytuno i ni ddefnyddio'ch manylion i:",
				listItem1: "gysylltu â chi ynglŷn â'r prosiect neu os bydd arnom angen mwy o wybodaeth",
				listItem2: 'rhoi gwybod i chi pryd y gallwch gyflwyno mwy o wybodaeth',
				paragraph4:
					"Rydych hefyd yn cytuno i'r holl sylwadau a gyflwynwch, ynghyd â'ch enw, gael eu cyhoeddi ar y wefan hon. Ni fydd unrhyw fanylion cyswllt yn cael eu cyhoeddi.",
				paragraph5:
					"Pan fyddwn yn cyhoeddi'ch sylwadau, ni ellir eu dileu o'r wefan. Gallwch dynnu'ch sylwadau cofrestru yn ôl o'r archwiliad o'r prosiect ac ni fyddant yn cael eu hystyried mwyach."
			},
			complete: {
				pageHeading: "Cofrestru wedi'i gwblhau",
				panel1: 'Eich rhif cyfeirnod',
				paragraph1: 'Rydym wedi anfon e-bost cadarnhau at: {{-email}}',
				paragraph2:
					'Byddwn yn cysylltu â chi os bydd arnom angen mwy o wybodaeth am y sylwadau a roddwyd gennych ar y ffurflen gofrestru.',
				heading1: 'Cymryd rhan yn y cyfarfod rhagarweiniol',
				paragraph3:
					"Ar ôl i'r cyfnod cofrestru gau, bydd llythyr a elwir yn llythyr rheol 6 yn cael ei anfon atoch, sy'n dweud wrthych pryd a ble y bydd y cyfarfod rhagarweiniol yn cael ei gynnal. Diben y cyfarfod hwn yw trafod sut bydd y cais yn cael ei archwilio. Bydd hefyd yn cynnwys amserlen ddrafft ar gyfer yr archwiliad o'r cais.",
				heading2: 'Sut a phryd i gyflwyno mwy o wybodaeth',
				paragraph4: "Byddwn yn rhoi gwybod i chi pan fydd yr archwiliad o'r cais hwn yn dechrau.",
				paragraph5:
					"Gallwch gyflwyno mwy o wybodaeth trwy lenwi'r ffurflen ar dudalen y prosiect. Bydd arnoch angen eich rhif cyfeirnod parti â buddiant i sicrhau bod eich sylwadau'n cael eu cynnwys yn yr archwiliad o'r cais.",
				paragraph6: 'Gallwch wirio ein canllaw i {{-link}}',
				paragraph6LinkText:
					"gael gwybod mwy am leisio'ch barn yn ystod yr archwiliad o'r cais (sy'n agor mewn tab newydd).",
				paragraph7LinkText: 'Dychwelyd i dudalen y prosiect',
				paragraph8: '{{-link}} trwy gwblhau arolwg byr.',
				paragraph8LinkText: 'Rhowch eich barn i ni am y gwasanaeth hwn'
			}
		});
	});
});
