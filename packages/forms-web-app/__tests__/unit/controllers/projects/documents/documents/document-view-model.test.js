const {
	mapDocumentsToViewModel
} = require('../../../../../../src/controllers/projects/documents/utils/documents/documents-view-model');

describe('#mapDocumentsToViewModel', () => {
	describe('When mapping the documents data to the view model', () => {
		const documents = [
			{
				datePublished: '2022-01-01',
				description: 'mock description',
				personalName: 'mock personal name',
				mime: 'mock mime',
				size: 'mock size',
				representative: 'mock representative',
				stage: 'mock stage',
				filter1: 'mock filter',
				extra: 'i should be ignored'
			}
		];
		const response = mapDocumentsToViewModel(documents);
		it('should return the correct structure for all documents in the array', () => {
			expect(response).toEqual([
				{
					date_published: '1 January 2022',
					description: 'mock description',
					personal_name: 'mock personal name',
					mime: 'mock mime',
					size: 'mock size',
					representative: 'mock representative',
					Stage: 'mock stage',
					filter_1: 'mock filter'
				}
			]);
		});
	});
});
