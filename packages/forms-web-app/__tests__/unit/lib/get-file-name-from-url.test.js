const { getFileNameFromDocumentUrl } = require('../../../src/lib/get-file-name-from-url');

describe('forms-web-app/src/lib/get-file-name-from-url.js', () => {
	describe('#getFileNameFromDocumentUrl', () => {
		it('should return null if url is not a string', () => {
			expect(getFileNameFromDocumentUrl([])).toEqual(null);
			expect(getFileNameFromDocumentUrl({})).toEqual(null);
			expect(getFileNameFromDocumentUrl(123)).toEqual(null);
			expect(getFileNameFromDocumentUrl(null)).toEqual(null);
			expect(getFileNameFromDocumentUrl(undefined)).toEqual(null);
		});
		it('should return null if function fails to extract file name', () => {
			expect(getFileNameFromDocumentUrl('')).toEqual(null);
			expect(
				getFileNameFromDocumentUrl(
					'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/wrong_file_name_format.doc'
				)
			).toEqual(null);
		});
		it('should extract file name from a document url', () => {
			expect(
				getFileNameFromDocumentUrl(
					'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/2021/03/2021-03-15-IPC_Decision_Notice.pdf'
				)
			).toEqual('IPC Decision Notice');
			expect(
				getFileNameFromDocumentUrl(
					'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/TR030001/TR030001-001428-Acceptance_of_Application.pdf'
				)
			).toEqual('Acceptance of Application');
			expect(
				getFileNameFromDocumentUrl(
					'https://test.com/mock/url/TR030001--Acceptance_of_Application.pdf'
				)
			).toEqual('Acceptance of Application');
		});
		it('should return correctly when there is no format suffix (Back Office / Migrated cases URIs)', () => {
			expect(
				getFileNameFromDocumentUrl(
					'https://back-office-applications-docs-test.planninginspectorate.gov.uk/published-documents/TR010012-000032-Scoping Opinion'
				)
			).toEqual('Scoping Opinion');
		});
		expect(
			getFileNameFromDocumentUrl(
				'https://back-office-applications-docs-test.planninginspectorate.gov.uk/published-documents/TR010012-000003-130619_TR010012_Letter to relevant stakeholders re consultation'
			)
		).toEqual('130619 TR010012 Letter to relevant stakeholders re consultation');
		expect(
			getFileNameFromDocumentUrl(
				'https://back-office-applications-docs-test.planninginspectorate.gov.uk/published-documents/TR010012-000036-Elmbridge Transport Scheme Scoping Report'
			)
		).toEqual('Elmbridge Transport Scheme Scoping Report');
	});
});
