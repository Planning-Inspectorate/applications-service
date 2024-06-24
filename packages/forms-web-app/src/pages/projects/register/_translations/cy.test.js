const cyRegisterTranslations = require('./cy.json');

describe('pages/projects/register/_translations/cy', () => {
	it('should return the english register translations', () => {
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
				validationErrorMessage: "Dewiswch ar ran pwy rydych chi'n cofrestru",
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
			}
		});
	});
});
