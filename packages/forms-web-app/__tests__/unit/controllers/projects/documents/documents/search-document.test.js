const {
	searchDocuments
} = require('../../../../../../src/controllers/projects/documents/utils/documents/searchDocuments');
const { searchDocumentsV3 } = require('../../../../../../src/services/document.service');
const {
	getBody
} = require('../../../../../../src/controllers/projects/documents/utils/documents/body/getBody');
const {
	documentsWithExaminationLibraryAtTheTop
} = require('../../../../../../src/controllers/projects/documents/utils/documents/documents-with-examination-library-at-the-top');

jest.mock('../../../../../../src/services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));
jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/documents/documents-with-examination-library-at-the-top',
	() => ({
		documentsWithExaminationLibraryAtTheTop: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/documents/body/getBody',
	() => ({
		getBody: jest.fn()
	})
);
describe('#searchDocuments', () => {
	describe('When searching for documents', () => {
		describe('and it is the first page', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = {};
			let response;
			beforeEach(async () => {
				documentsWithExaminationLibraryAtTheTop.mockReturnValue([
					'mock documents with examination'
				]);
				getBody.mockReturnValue({ text: 'mock body' });
				searchDocumentsV3.mockReturnValue({
					data: {
						documents: ['mock search response'],
						filters: ['mock filters'],
						totalItems: '100',
						itemsPerPage: '20',
						totalPages: '5',
						currentPage: '2'
					}
				});
				response = await searchDocuments(mockCaseRef, mockQuery);
			});

			it('should call the examination library document mapper', () => {
				expect(documentsWithExaminationLibraryAtTheTop).toHaveBeenCalledWith(
					{ text: 'mock body' },
					['mock search response']
				);
			});

			it('should call the search documents service', () => {
				expect(searchDocumentsV3).toHaveBeenCalledWith({ text: 'mock body' });
			});
			it('should return the response mapped to documents, filters and pagination', () => {
				expect(response).toEqual({
					documents: ['mock documents with examination'],
					filters: ['mock filters'],
					pagination: {
						totalItems: '100',
						itemsPerPage: '20',
						totalPages: '5',
						currentPage: '2'
					}
				});
			});
		});

		describe('and it is not the first page', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = { page: 2 };
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
						currentPage: '2'
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
						currentPage: '2'
					}
				});
			});
		});
	});
});
