const { getExaminationLibraryDocumentHtml } = require('./get-examination-library-document-html');

const { mockI18n } = require('../../../../_mocks/i18n');

const projectsDocumentsTranslations_EN = require('../../_translations/en.json');

const i18n = mockI18n({ projectsDocuments: projectsDocumentsTranslations_EN });

describe('pages/projects/documents/_utils/documents/get-examination-library-document-html', () => {
	describe('#getExaminationLibraryDocumentHtml', () => {
		describe('When getting the examination library document html', () => {
			describe('and there is no document provided', () => {
				let result;
				beforeEach(() => {
					result = getExaminationLibraryDocumentHtml(i18n, null);
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
					result = getExaminationLibraryDocumentHtml(i18n, mockDocument);
				});
				it('should return the examination library document html', () => {
					expect(result).toEqual(
						'<a class="govuk-link" href="mock/path">View examination library (PDF, 100Bytes)</a> containing document reference numbers'
					);
				});
			});
		});
	});
});
