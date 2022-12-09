const { searchDocumentsV3 } = require('../../../../../../src/services/document.service');
const {
	documentsWithExaminationLibraryAtTheTop
} = require('../../../../../../src/controllers/projects/docments/utils/documents/documents-with-examination-library-at-the-top');

jest.mock('../../../../../../src/services/document.service', () => ({
	searchDocumentsV3: jest.fn()
}));

describe('#documentsWithExaminationLibraryAtTheTop', () => {
	describe('When checking if a the documents have a examination library element', () => {
		describe('and there is a document with examination library', () => {
			const mockBody = {};
			const mockDocs = [
				{
					name: 'provided doc',
					type: 'mock type'
				}
			];
			let response;
			beforeEach(async () => {
				searchDocumentsV3.mockReturnValue({
					data: {
						documents: [{ name: 'exam mock', type: 'examination library' }]
					}
				});
				response = await documentsWithExaminationLibraryAtTheTop(mockBody, mockDocs);
			});
			it('should return an array with only one occurrence od examination library and the examination library at the top', () => {
				expect(response).toEqual([
					{ name: 'exam mock', type: 'examination library' },
					{ name: 'provided doc', type: 'mock type' }
				]);
			});
		});
		describe('and there is a NO document with examination library', () => {
			const mockBody = {};
			const mockDocs = [
				{
					name: 'provided doc',
					type: 'mock type'
				}
			];
			let response;
			beforeEach(async () => {
				searchDocumentsV3.mockReturnValue({
					data: {
						documents: []
					}
				});
				response = await documentsWithExaminationLibraryAtTheTop(mockBody, mockDocs);
			});
			it('should return an provided docs', () => {
				expect(response).toEqual([{ name: 'provided doc', type: 'mock type' }]);
			});
		});
	});
});
