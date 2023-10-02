const { getApplicationsDownload } = require('./controller');

const { getApplicationsCSV } = require('../_services/get-applications-csv');

jest.mock('../_services/get-applications-csv', () => ({
	getApplicationsCSV: jest.fn()
}));

describe('api/applications-download/controller', () => {
	describe('#getApplicationsDownload', () => {
		describe('When getting the applications download CSV', () => {
			describe('and there is an issue', () => {
				const req = {};
				const res = {
					status: jest.fn(() => res),
					send: jest.fn()
				};
				beforeEach(() => {
					getApplicationsCSV.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getApplicationsDownload(req, res);
				});
				it('should throw an error', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.send).toHaveBeenCalledWith('Failed to download Applications CSV');
				});
			});

			describe('and there are no issues', () => {
				const req = {};
				const res = {
					attachment: jest.fn(() => res),
					send: jest.fn()
				};
				beforeEach(() => {
					getApplicationsCSV.mockImplementation(() => {
						return 'applications download CSV';
					});
					getApplicationsDownload(req, res);
				});
				it('should return the applications download CSV', () => {
					expect(res.attachment).toHaveBeenCalledWith('applications.csv');
					expect(res.send).toHaveBeenCalledWith('applications download CSV');
				});
			});
		});
	});
});
