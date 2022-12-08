const {
	searchDocuments
} = require('../../../../../../src/controllers/projects/docments/utils/documents/searchDocuments');
const { searchDocumentsV3 } = require('../../../../../../src/services/document.service');
const {
	getBody
} = require('../../../../../../src/controllers/projects/docments/utils/documents/body/getBody');

jest.mock('../../../../../../src/services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));
jest.mock(
	'../../../../../../src/controllers/projects/docments/utils/documents/body/getBody',
	() => ({
		getBody: jest.fn()
	})
);
describe('#searchDocuments', () => {
	describe('When searching for documents', () => {
		const mockCaseRef = 'mock case ref';
		const mockQuery = { text: 'mock query' };
		let response;
		beforeEach(async () => {
			getBody.mockReturnValue({ text: 'mock body' });
			searchDocumentsV3.mockReturnValue({
				data: {
					documents: ['mock documents'],
					filters: ['mock filters'],
					totalItems: '100',
					itemsPerPage: '20',
					totalPages: '5',
					currentPage: '1'
				}
			});
			response = await searchDocuments(mockCaseRef, mockQuery);
		});

		it('should call the search documents service', () => {
			expect(searchDocumentsV3).toHaveBeenCalledWith({ text: 'mock body' });
		});
		it('should return the response mapped to documents, filters and pagination', () => {
			expect(response).toEqual({
				documents: ['mock documents'],
				filters: ['mock filters'],
				pagination: {
					totalItems: '100',
					itemsPerPage: '20',
					totalPages: '5',
					currentPage: '1'
				}
			});
		});
	});
});
