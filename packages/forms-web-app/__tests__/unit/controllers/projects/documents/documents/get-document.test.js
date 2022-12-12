const {
	getDocuments
} = require('../../../../../../src/controllers/projects/docments/utils/documents/getDocuments');
const {
	mapDocumentsToViewModel
} = require('../../../../../../src/controllers/projects/docments/utils/documents/documents-view-model');

jest.mock(
	'../../../../../../src/controllers/projects/docments/utils/documents/documents-view-model',
	() => ({
		mapDocumentsToViewModel: jest.fn()
	})
);

describe('#getDocuments', () => {
	describe('When getting the documents for the view', () => {
		const mockDocuments = ['mock documents'];
		let response;
		beforeEach(() => {
			mapDocumentsToViewModel.mockReturnValue(['mock documents view model']);
			response = getDocuments(mockDocuments);
		});
		it('should call the map documents to view model func', () => {
			expect(response).toEqual(['mock documents view model']);
		});
	});
});
