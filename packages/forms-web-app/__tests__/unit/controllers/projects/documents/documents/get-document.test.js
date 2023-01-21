const {
	getDocuments
} = require('../../../../../../src/controllers/projects/documents/utils/documents/getDocuments');
const {
	mapDocumentsToViewModel
} = require('../../../../../../src/controllers/projects/documents/utils/documents/documents-view-model');
const {
	getExaminationLibraryDocumentHtml
} = require('../../../../../../src/controllers/projects/documents/utils/documents/get-examination-library-document-html');

jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/documents/documents-view-model',
	() => ({
		mapDocumentsToViewModel: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/projects/documents/utils/documents/get-examination-library-document-html',
	() => ({
		getExaminationLibraryDocumentHtml: jest.fn()
	})
);

describe('#getDocuments', () => {
	describe('When getting the documents for the view', () => {
		const mockDocuments = ['mock documents'];
		let response;
		beforeEach(() => {
			mapDocumentsToViewModel.mockReturnValue(['mock documents view model']);
			getExaminationLibraryDocumentHtml.mockReturnValue('mock examination library document html');
			response = getDocuments(mockDocuments);
		});
		it('should call the map documents to view model func', () => {
			expect(response).toEqual({
				documents: ['mock documents view model'],
				examinationLibraryDocumentHtml: 'mock examination library document html'
			});
		});
	});
});
