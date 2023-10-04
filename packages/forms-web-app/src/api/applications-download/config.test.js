const { applicationsDownloadRoute, applicationsDownloadURL } = require('./config');

describe('api/applications-download/config', () => {
	describe('#applicationsDownloadRoute', () => {
		it('should return the applications download route', () => {
			expect(applicationsDownloadRoute).toEqual('applications-download');
		});
	});

	describe('#applicationsDownloadURL', () => {
		it('should return the applications download url', () => {
			expect(applicationsDownloadURL).toEqual('/api/applications-download');
		});
	});
});
