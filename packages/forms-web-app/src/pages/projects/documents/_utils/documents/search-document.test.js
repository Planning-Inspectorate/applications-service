const { searchDocuments } = require('./searchDocuments');
const { searchDocumentsV3 } = require('../../../../../services/document.service');
const { searchExaminationLibraryDocument } = require('./search-examination-library-document');
const { getBody } = require('./body/getBody');

jest.mock('../../../../../services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));
jest.mock('./body/getBody', () => ({
	getBody: jest.fn()
}));
jest.mock('./search-examination-library-document', () => ({
	searchExaminationLibraryDocument: jest.fn()
}));

describe('#searchDocuments', () => {
	describe('When searching for documents', () => {
		const mockCaseRef = 'mock case ref';
		const mockQuery = {};
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
				searchExaminationLibraryDocument.mockReturnValue({
					name: 'mock examionation library document'
				});
				response = await searchDocuments(mockCaseRef, mockQuery);
			});

			it('should call the search documents service', () => {
				expect(searchDocumentsV3).toHaveBeenCalledWith({ text: 'mock body' });
			});
			it('should call the examination library document', () => {
				expect(searchExaminationLibraryDocument).toHaveBeenCalledWith(mockCaseRef);
			});
			it('should return the response mapped to documents, filters and pagination', () => {
				expect(response).toEqual({
					documents: ['mock documents'],
					examinationLibraryDocument: { name: 'mock examionation library document' },
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
