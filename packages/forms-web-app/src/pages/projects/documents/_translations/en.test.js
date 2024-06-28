const enProjectsDocumentsTranslations = require('./en.json');

describe('pages/projects/documents/_translations/en', () => {
	it('should return the english projects documents page translations', () => {
		expect(enProjectsDocumentsTranslations).toEqual({
			common: {
				documents: 'documents'
			},
			heading1: 'Documents',
			paragraph1: '{{-link}} containing document reference numbers',
			paragraph1LinkText: 'View examination library',
			heading2: 'Search documents',
			paragraph2: 'Search by author, description or document type.',
			paragraph3: 'Showing {{-from}} to {{-to}} of {{-total}} documents, newest first.',
			noResultsFound: {
				paragraph1: 'No results were found matching your search term or filters.',
				paragraph2:
					'Would you like to clear your search and filters to view all available documents instead?',
				linkText1: 'Clear search and filters'
			},
			noResults: {
				paragraph1:
					'There are no project application documents available to display at the moment.',
				linkText1: 'Return to the project overview'
			},
			filteredResults: {
				heading1: 'Filtered results'
			},
			errors: {
				fromDateAfterToDate: 'The from date entered should start before the to date',
				fromDatePast: 'The from date must be in the past',
				emptyValue: 'The {{-formGroup}} date must include {{-emptyValue}}',
				emptyValues: '{{-errorMessage}} and {{-emptyValue}}',
				mustBeRealDate: 'The {{-formGroup}} date must be a real date',
				title: {
					from: 'from',
					to: 'to'
				}
			}
		});
	});
});
