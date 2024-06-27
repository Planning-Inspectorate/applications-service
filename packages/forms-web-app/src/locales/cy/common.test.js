const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			applyFilters: 'Cynnig hidlydd',
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
			saveChanges: 'Achub newidiadau',
			search: 'Chwilio',
			selectAllFilters: 'Dewiswch bob hidlydd',
			show: 'Dangos',
			showAllSections: 'Dangos pob adran',
			showAllSteps: 'Dangos pob cam',
			showFilters: 'Dangos hidlydd',
			startNow: 'Dechrau nawr',
			success: 'Llwyddiant',
			to: 'I',
			validationErrors: {
				emailAddress: {
					empty: 'Nodwch eich cyfeiriad e-bost',
					length: "Mae'n rhaid i'ch cyfeiriad e-bost gynnwys rhwng 3 a 255 o nodau",
					format: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@enghraifft.com'
				}
			},
			year: 'Blwyddyn',
			yes: 'Ydw'
		});
	});
});
