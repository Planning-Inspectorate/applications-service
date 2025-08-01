const constructUrlForBlobStoreDocsTest = require('../../../src/utils/construct-url-for-blob-store-docs');

describe('constructUrlForBlobStoreDocs', () => {
	it('returns the correct URL for production environment', () => {
		process.env.NODE_ENV = 'prod';
		const url = constructUrlForBlobStoreDocsTest();
		expect(url).toBe('https://nsip-documents.planninginspectorate.gov.uk/');
	});
	it('returns the correct URL for test environment', () => {
		process.env.NODE_ENV = 'test';
		const url = constructUrlForBlobStoreDocsTest();
		expect(url).toBe('https://back-office-applications-docs-test.planninginspectorate.gov.uk/');
	});
	it('returns the correct URL for development environment', () => {
		process.env.NODE_ENV = 'dev';
		const url = constructUrlForBlobStoreDocsTest();
		expect(url).toBe('https://back-office-applications-docs-dev.planninginspectorate.gov.uk/');
	});
	it('returns the correct URL for training environment', () => {
		process.env.NODE_ENV = 'training';
		const url = constructUrlForBlobStoreDocsTest();
		expect(url).toBe('https://back-office-applications-docs-train.planninginspectorate.gov.uk/');
	});
	it('returns the correct URL for local/an unknown environment', () => {
		process.env.NODE_ENV = 'unknown';
		const url = constructUrlForBlobStoreDocsTest();
		expect(url).toBe('https://back-office-applications-docs-dev.planninginspectorate.gov.uk/');
	});
});
