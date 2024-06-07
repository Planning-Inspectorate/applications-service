const enProjectsDocumentsTranslations = require('./en.json');

describe('pages/projects/documents/_translations/en', () => {
	it('should return the english projects documents page translations', () => {
		expect(enProjectsDocumentsTranslations).toEqual({
			heading1: 'Documents',
			heading2: 'Search documents',
			noResults: {
				linkText1: 'Return to the project overview',
				paragraph1: 'There are no project application documents available to display at the moment.'
			},
			noResultsFound: {
				linkText1: 'Clear search and filters',
				paragraph1: 'No results were found matching your search term or filters.',
				paragraph2:
					'Would you like to clear your search and filters to view all available documents instead?'
			},
			paragraph1: '{{-link}} containing document reference numbers',
			paragraph1LinkText: 'View examination library',
			paragraph2: 'Search by author, description or document type.',
			paragraph3: 'Showing {{-from}} to {{-to}} of {{-total}} documents, newest first.'
		});
	});
});
