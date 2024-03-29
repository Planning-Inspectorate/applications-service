const { getExaminationLibraryDocumentHtml } = require('./get-examination-library-document-html');

describe('controllers/projects/documents/utils/documents/get-examination-library-document-html', () => {
	describe('#getExaminationLibraryDocumentHtml', () => {
		describe('When getting the examination library document html', () => {
			describe('and there is no document provided', () => {
				let result;
				beforeEach(() => {
					result = getExaminationLibraryDocumentHtml();
				});
				it('should return null', () => {
					expect(result).toBeNull();
				});
			});
			describe('and there is a document provided with the required keys', () => {
				let result;
				const mockDocument = {
					mime: 'application/pdf',
					path: 'mock/path',
					size: '100'
				};
				beforeEach(() => {
					result = getExaminationLibraryDocumentHtml(mockDocument);
				});
				it('should return the examination library document html', () => {
					expect(result).toEqual(
						'<p><a class="govuk-link" href="mock/path">View examination library (PDF, 100Bytes)</a> containing document reference numbers</p>'
					);
				});
			});
		});
	});
});
