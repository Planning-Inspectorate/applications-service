const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			applyFilters: 'Apply filters',
			clearAllFilters: 'Clear all filters',
			clearFilters: 'Clear filters',
			close: 'Close',
			contents: 'Contents',
			dateFrom: 'Date from',
			datePublished: 'Date published',
			dateTo: 'Date to',
			day: 'Day',
			filter: 'Filter',
			from: 'From',
			govUK: {
				pressOfficeOpeningHours: '9:00 to 17:00 on Monday to Friday (except public holidays)'
			},
			hide: 'Hide',
			hideAllSections: 'Hide all sections',
			hideAllSteps: 'Hide all steps',
			month: 'Month',
			next: 'Next',
			open: 'Open',
			partOf: 'Part of',
			pinsContactDetails: { csOpeningHours: 'Monday to Friday, 9am to 4pm (except bank holidays)' },
			resultsPerPage: 'Results per page',
			returnToResults: 'Return to results',
			search: 'Search',
			selectAllFilters: 'Select all filters',
			show: 'Show',
			showAllSections: 'Show all sections',
			showAllSteps: 'Show all steps',
			showFilters: 'Show filters',
			to: 'To',
			year: 'Year'
		});
	});
});
