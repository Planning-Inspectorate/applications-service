const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			applyFilters: 'Apply filters',
			clearAllFilters: 'Clear all filters',
			clearFilters: 'Clear filters',
			clearSearch: 'Clear search',
			close: 'Close',
			contents: 'Contents',
			continue: 'Continue',
			dateFrom: 'Date from',
			datePublished: 'Date published',
			dateTo: 'Date to',
			day: 'Day',
			error: 'Error',
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
			no: 'No',
			open: 'Open',
			partOf: 'Part of',
			pinsContactDetails: {
				csOpeningHours: 'Monday to Friday, 9am to 4pm (except bank holidays)'
			},
			resultsPerPage: 'Results per page',
			returnToResults: 'Return to results',
			saveChanges: 'Save changes',
			search: 'Search',
			selectAllFilters: 'Select all filters',
			show: 'Show',
			showAllSections: 'Show all sections',
			showAllSteps: 'Show all steps',
			showFilters: 'Show filters',
			startNow: 'Start now',
			success: 'Success',
			thereIsAProblem: 'There is a problem',
			to: 'To',
			validationErrors: {
				emailAddress: {
					empty: 'Enter your email address',
					length: 'Email address must be between 3 and 255 characters',
					format: 'Enter an email address in the correct format, like name@example.com'
				}
			},
			year: 'Year',
			yes: 'Yes',
			validationErrors: {
				emailAddress: {
					empty: 'Enter your email address',
					length: 'Email address must be between 3 and 255 characters',
					format: 'Enter an email address in the correct format, like name@example.com'
				},
				fullName: {
					message1: 'Enter your full name',
					message2: 'Full name must be between 3 and 64 characters'
				},
				areYou18: 'Select yes if you are 18 or over',
				address: {
					line1Empty: 'Enter address line 1',
					line1Length: 'Address line 1 must be 255 characters or less',
					line2Length: 'Address line 2 must be 96 characters or less',
					line3Length: 'Town or city must be 64 characters or less',
					postcodeEmpty: 'Enter a postcode',
					postcodeLength: 'Postcode must be 16 characters or less',
					countryEmpty: 'Enter a country',
					countryLength: 'Country must be 64 characters or less'
				}
			}
		});
	});
});
