const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			acceptAndContinue: 'Derbyn a pharhau',
			applyFilters: 'Cynnig hidlydd',
			change: 'Newid',
			clearAllFilters: 'Clirio pob hidlydd',
			clearFilters: 'Cliriwch hidlydd',
			clearSearch: 'Clirio chwiliad',
			close: 'Caeedig',
			contents: 'Cynnwys',
			continue: 'Parhau',
			dateFrom: 'Dyddiad o',
			datePublished: 'Dyddiad cyhoeddi',
			dateTo: 'Dyddiad i',
			day: 'Diwrnod',
			error: 'Gwall',
			filter: 'Hidlydd',
			from: 'Oddi wrth',
			govUK: {
				pressOfficeOpeningHours:
					'9:00 tan 17:00 o ddydd Llun i ddydd Gwener (heblaw am wyliau cyhoeddus)'
			},
			hide: 'Cuddio',
			hideAllSections: 'Cuddio pob adran',
			hideAllSteps: 'Cuddio pob cam',
			month: 'Mis',
			next: 'Nesaf',
			no: 'Nac ydw',
			open: 'Agor',
			partOf: 'Rhan o',
			pinsContactDetails: {
				csOpeningHours: 'Dydd Llun i ddydd Gwener, 9am tan 4pm (heblaw am wyliau cyhoeddus)'
			},
			resultsPerPage: 'Canlyniadau fesul tudalen',
			returnToResults: 'Dychwelyd at ganlyniadau',
			saveAndExit: 'Arbed a Gadael',
			saveChanges: 'Achub newidiadau',
			search: 'Chwilio',
			selectAllFilters: 'Dewiswch bob hidlydd',
			show: 'Dangos',
			showAllSections: 'Dangos pob adran',
			showAllSteps: 'Dangos pob cam',
			showFilters: 'Dangos hidlydd',
			startNow: 'Dechrau nawr',
			success: 'Llwyddiant',
			thereIsAProblem: 'Mae yna broblem',
			to: 'I',
			validationErrors: {
				emailAddress: {
					empty: 'Nodwch eich cyfeiriad e-bost',
					length: "Mae'n rhaid i'ch cyfeiriad e-bost gynnwys rhwng 3 a 255 o nodau",
					format: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@enghraifft.com'
				}
			},
			year: 'Blwyddyn',
			yes: 'Ydw',
			validationErrors: {
				emailAddress: {
					empty: 'Nodwch eich cyfeiriad e-bost',
					length: "Mae'n rhaid i'ch cyfeiriad e-bost gynnwys rhwng 3 a 255 o nodau",
					format: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@enghraifft.com'
				},
				fullName: {
					empty: 'Nodwch eich enw llawn',
					length: "Mae'n rhaid i'ch enw llawn gynnwys rhwng 3 a 64 o nodau"
				},
				areYou18: "Dewiswch 'ydw' os ydych yn 18 oed neu'n hŷn",
				address: {
					line1Empty: 'Nodwch linell gyfeiriad 1',
					line1Length: "Mae'n rhaid i linell gyfeiriad 1 gynnwys 255 o nodau neu lai",
					line2Length: "Mae'n rhaid i linell gyfeiriad 2 gynnwys 96 o nodau neu lai",
					line3Length: "Mae'n rhaid i'r dref neu'r ddinas gynnwys 64 o nodau neu lai",
					postcodeEmpty: 'Nodwch god post',
					postcodeLength: "Mae'n rhaid i'r cod post gynnwys 16 o nodau neu lai",
					countryEmpty: 'Nodwch wlad',
					countryLength: "Mae'n rhaid i'r wlad gynnwys 64 o nodau neu lai"
				},
				telephone: {
					empty: 'Nodwch eich rhif ffôn',
					length: "Mae'n rhaid i'ch rhif ffôn gynnwys 255 o nodau neu lai",
					format: 'Nodwch rif ffôn, fel 01632 960 001, 07700 900 982 neu 44 808 157 0192'
				},
				registeringFor: {
					empty: "Dewiswch ar ran pwy rydych chi'n cofrestru"
				},
				aboutProject: {
					empty: 'Nodwch yr hyn rydych eisiau ei ddweud wrthym am y prosiect arfaethedig hwn',
					length:
						"Mae'n rhaid i'r hyn rydych eisiau ei ddweud wrthym gynnwys {{-maxCharacters}} o nodau neu lai"
				}
			}
		});
	});
});
