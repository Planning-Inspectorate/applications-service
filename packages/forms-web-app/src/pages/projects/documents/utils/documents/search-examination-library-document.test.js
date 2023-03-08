const { searchExaminationLibraryDocument } = require('./search-examination-library-document');

const { searchDocumentsV3 } = require('../../../../../services/document.service');

jest.mock('../../../../../services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));

describe('controllers/projects/documents/utils/documents/search-examination-library-document', () => {
	describe('#searchExaminationLibraryDocument', () => {
		describe('When searching for the examination library document', () => {
			const body = { text: 'mock body' };
			describe('and there is an examination library document returned in an array', () => {
				let result;
				const mockBody = { ...body };
				beforeEach(async () => {
					searchDocumentsV3.mockReturnValue({
						data: {
							documents: [{ name: 'mock examination library document' }]
						}
					});
					result = await searchExaminationLibraryDocument(mockBody);
				});
				it('should return the examination library document object', () => {
					expect(result).toEqual({ name: 'mock examination library document' });
				});
			});
			describe('and there is no an examination library document returned in an array', () => {
				let result;
				const mockBody = { ...body };
				beforeEach(async () => {
					searchDocumentsV3.mockReturnValue({
						data: {
							documents: []
						}
					});
					result = await searchExaminationLibraryDocument(mockBody);
				});
				it('should return undefined', () => {
					expect(result).not.toBeDefined();
				});
			});
		});
	});
});
