const { getApplicationData } = require('./get-application-data');
const { getAppData } = require('../../../../services/application.service');
jest.mock('../../../../services/application.service', () => ({
	getAppData: jest.fn()
}));
describe('#getApplicationData', () => {
	describe('When getting the application data', () => {
		describe('and the response is 200', () => {
			let response;
			beforeEach(async () => {
				getAppData.mockReturnValue({
					data: { ProjectName: 'mock project name' },
					resp_code: 200
				});
				response = await getApplicationData('mock case ref');
			});
			it('should return the project name in an obejct', () => {
				expect(response).toEqual({
					projectName: 'mock project name'
				});
			});
		});
		describe('and the status code is not 200', () => {
			beforeEach(() => {
				getAppData.mockReturnValue({ data: 'mock data', resp_code: 500 });
			});
			it('should throw an error', async () => {
				await expect(getApplicationData('mock-case-ref')).rejects.toThrow(
					'Application response status not 200'
				);
			});
		});
	});
});
