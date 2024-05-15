const cyProcessGuideTranslations = require('./cy.json');

describe('pages/process-guide/_translations/cy', () => {
	it('should return the welsh process guide page translations', () => {
		expect(cyProcessGuideTranslations).toEqual({
			acceptance: {
				heading1: 'Derbyn',
				linkText: "Sut mae'r cam derbyn yn gweithio a beth fydd yn digwydd nesaf.",
				paragraph1:
					"Dyma'r adeg pan fydd yr ymgeisydd yn anfon ei ddogfennau cais atom. Byddwn yn gwirio a allwn dderbyn y cais i'w archwilio. Mae gennym 28 niwrnod i wneud y penderfyniad hwn."
			},
			common: { processGuide: 'Canllaw proses' },
			decision: {
				heading1: 'Penderfyniad',
				linkText: "Pwy sy'n gwneud y penderfyniad terfynol.",
				paragraph1:
					"Y cam penderfynu yw'r adeg pan fydd yr Ysgrifennydd Gwladol perthnasol yn adolygu'r adroddiad ac yn gwneud y penderfyniad terfynol. Mae ganddo 3 mis i wneud penderfyniad."
			},
			examination: {
				heading1: 'Archwiliad',
				linkText: "Beth sy'n digwydd yn ystod y cam archwilio?",
				paragraph1:
					"Bydd yr Awdurdod Archwilio'n gofyn cwestiynau am y datblygiad arfaethedig. Gall yr ymgeisydd ac unrhyw un sydd wedi cofrestru i leisio'i farn gymryd rhan a chyflwyno sylwadau erbyn pob terfyn amser yn yr amserlen. Gallwch hefyd fynychu gwrandawiadau a allai gael eu cynnal. Mae'r cam hwn yn cymryd hyd at 6 mis."
			},
			index: {
				heading1: 'Y broses ar gyfer Prosiectau Seilwaith o Arwyddocâd Cenedlaethol (NSIPau)'
			},
			postDecision: {
				heading1: "Beth sy'n digwydd ar ôl i'r penderfyniad gael ei wneud",
				linkText: "Yr hyn y gallwch ei wneud ar ôl i'r penderfyniad gael ei wneud.",
				paragraph1:
					"Pan fydd yr Ysgrifennydd Gwladol wedi gwneud penderfyniad, mae cyfnod o 6 wythnos pryd y gall pobl herio'r penderfyniad yn yr Uchel Lys. Yr enw ar hyn yw adolygiad barnwrol."
			},
			preApplication: {
				heading1: 'Cyn-ymgeisio',
				linkText:
					'Dysgwch beth allwch chi ei wneud yn ystod y cam hwn a gwiriwch ein canllawiau manwl.',
				paragraph1:
					"Dyma'r adeg pan fydd yr ymgeisydd yn dechrau creu ei gais. Mae'n ofynnol i'r ymgeisydd ymgynghori â phobl a sefydliadau yn yr ardal. Mae'n rhaid iddo hefyd greu dogfennau manwl ynglŷn â'r effaith y gallai'r prosiect ei chael ar yr amgylchedd.",
				paragraph2:
					"Mae'n bwysig cymryd rhan yn ystod y cam hwn er mwyn dylanwadu ar y cais cyn i'r ymgeisydd ei anfon at yr Arolygiaeth Gynllunio."
			},
			preExamination: {
				heading1: 'Cyn-archwilio',
				linkText: "Beth sy'n digwydd yn ystod y cam cyn-archwilio.",
				paragraph1:
					"Penodir Awdurdod Archwilio sy'n cynnwys un neu fwy o arolygwyr. Mae'n rhaid i unrhyw un sydd eisiau lleisio'i farn allu cofrestru yn ystod y cam hwn.",
				paragraph2:
					"Mae'n rhaid i'r ymgeisydd gyhoeddi bod y cais wedi cael ei dderbyn gennym. Bydd yn cynnwys pryd a sut y gall partïon gofrestru i gymryd rhan. Mae'r cyfnod ar gyfer cofrestru'n cael ei osod gan yr ymgeisydd, ond mae'n rhaid iddo beidio â bod yn llai na 28 niwrnod.",
				paragraph3: "Mae'r cam cyn-archwilio'n cymryd oddeutu 3 mis fel arfer."
			},
			recommendation: {
				heading1: 'Argymhelliad',
				linkText: 'Gwneud argymhelliad.',
				paragraph1:
					"Mae'r Awdurdod Archwilio'n ysgrifennu ei adroddiad argymhelliad. Mae'n rhaid i hwn gael ei gwblhau a'i anfon at yr Ysgrifennydd Gwladol perthnasol o fewn 3 mis o ddiwedd y cam archwilio."
			}
		});
	});
});
