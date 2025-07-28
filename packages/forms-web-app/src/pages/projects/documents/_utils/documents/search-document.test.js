const { searchDocuments } = require('./searchDocuments');
const { wrappedSearchDocumentsV3 } = require('../../../../../lib/application-api-wrapper');
const { getBody } = require('./body/getBody');

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	wrappedSearchDocumentsV3: jest.fn()
}));
jest.mock('./body/getBody', () => ({
	getBody: jest.fn()
}));

describe('#searchDocuments', () => {
	describe('When searching for documents', () => {
		const mockCaseRef = 'mock case ref';
		const mockQuery = {};
		beforeEach(async () => {
			getBody.mockReturnValue({ text: 'mock body' });
			wrappedSearchDocumentsV3.mockReturnValue({
				data: {
					documents: ['mock documents'],
					filters: ['mock filters'],
					totalItems: '100',
					itemsPerPage: '20',
					totalPages: '5',
					currentPage: '2'
				}
			});
		});
		describe('and there is no an examination library document', () => {
			let response;
			beforeEach(async () => {
				response = await searchDocuments(mockCaseRef, mockQuery);
			});

			it('should not get the examination library document html', () => {
				expect(response.examinationLibraryDocument).not.toBeDefined();
			});
		});
		describe('and there is an examination library document', () => {
			let response;
			beforeEach(async () => {
				response = await searchDocuments(mockCaseRef, mockQuery);
			});

			it('should call the search documents service', () => {
				expect(wrappedSearchDocumentsV3).toHaveBeenCalledWith({ text: 'mock body' });
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
