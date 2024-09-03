const { searchExaminationLibraryDocument } = require('./search-examination-library-document');

const { wrappedSearchDocumentsV3 } = require('../../../../../lib/application-api-wrapper');

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	wrappedSearchDocumentsV3: jest.fn()
}));

describe('controllers/projects/documents/utils/documents/search-examination-library-document', () => {
	describe('#searchExaminationLibraryDocument', () => {
		describe('When searching for the examination library document', () => {
			const mockBody = { text: 'mock body' };
			describe('and there is an examination library document returned in an array', () => {
				const mockExamLibraryDocument = {
					name: 'mock examination library document',
					type: 'Examination Library'
				};

				wrappedSearchDocumentsV3.mockReturnValueOnce({
					data: {
						documents: [
							mockExamLibraryDocument,
							{ name: 'some other examination library document' }
						]
					}
				});

				it('should return the examination library document object', async () => {
					const result = await searchExaminationLibraryDocument(mockBody);

					expect(result).toEqual(mockExamLibraryDocument);
				});
			});

			describe('and there is no an examination library document returned in an array', () => {
				wrappedSearchDocumentsV3.mockReturnValueOnce({
					data: {
						documents: []
					}
				});

				it('should return undefined', async () => {
					const result = await searchExaminationLibraryDocument(mockBody);

					expect(result).not.toBeDefined();
				});
			});

			describe('and there is no an document with type of examination library returned in an array', () => {
				wrappedSearchDocumentsV3.mockReturnValueOnce({
					data: {
						documents: [
							{ name: 'some examination library document', type: 'not examination library' }
						]
					}
				});

				it('should return undefined', async () => {
					const result = await searchExaminationLibraryDocument(mockBody);

					expect(result).not.toBeDefined();
				});
			});
		});
	});
});
