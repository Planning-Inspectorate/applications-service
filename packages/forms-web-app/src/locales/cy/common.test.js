const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			applyFilters: 'Cynnig hidlydd',
			clearAllFilters: 'Clirio pob hidlydd',
			clearFilters: 'Cliriwch hidlydd',
			close: 'Caeedig',
			contents: 'Cynnwys',
			datePublished: 'Dyddiad cyhoeddi',
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
			open: 'Agor',
			partOf: 'Rhan o',
			pinsContactDetails: {
				csOpeningHours: 'Dydd Llun i ddydd Gwener, 9am tan 4pm (heblaw am wyliau cyhoeddus)'
			},
			resultsPerPage: 'Canlyniadau fesul tudalen',
			returnToResults: 'Dychwelyd at ganlyniadau',
			search: 'Chwilio',
			selectAllFilters: 'Dewiswch bob hidlydd',
			show: 'Dangos',
			showAllSections: 'Dangos pob adran',
			showAllSteps: 'Dangos pob cam',
			showFilters: 'Dangos hidlydd',
			to: 'I',
			year: 'Blwyddyn'
		});
	});
});
