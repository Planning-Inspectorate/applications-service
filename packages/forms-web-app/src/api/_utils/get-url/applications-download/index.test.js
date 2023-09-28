const { getApplicationsDownloadURL } = require('.');

describe('api/_utils/get-url/applications-download/index.test.js', () => {
	describe('When getting the URL', () => {
		describe('#getApplicationsDownloadURL', () => {
			const applicationsDownloadURL = getApplicationsDownloadURL;

			it('should return the applications download URL', () => {
				expect(applicationsDownloadURL).toEqual('/api/applications-download');
			});
		});
	});
});
