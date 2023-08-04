const { getApplicationData } = require('./get-application-data');
const { getAppData } = require('../../../services/application.service');
jest.mock('../../../services/application.service', () => ({
	getAppData: jest.fn()
}));

const commonMockData = {
	ProjectName: 'mock project name',
	Proposal: 'I am the proposal',
	Summary: 'I am the project summary data',
	WebAddress: 'mock-web-address',
	dateOfNonAcceptance: '2020-01-01',
	AnticipatedDateOfSubmission: '2020-01-01',
	ProjectEmailAddress: 'mock@email.com',
	DateOfDCOSubmission: '2020-01-01'
};

describe('#getApplicationData', () => {
	describe('When getting the application data', () => {
		describe('and the response is 200', () => {
			let response;
			beforeEach(async () => {
				getAppData.mockReturnValue({
					data: {
						...commonMockData,
						Stage: 1
					},
					resp_code: 200
				});
				response = await getApplicationData('mock case ref');
			});
			it('should return the project name in an obejct', () => {
				expect(response).toEqual({
					anticipatedDateOfSubmission: '2020-01-01',
					contactEmailAddress: 'mock@email.com',
					dateOfNonAcceptance: '2020-01-01',
					projectName: 'mock project name',
					proposal: 'I am the proposal',
					DateOfDCOSubmission: '2020-01-29T00:00:00.000Z',
					status: {
						number: 1,
						text: 'Pre-application'
					},
					summary: 'I am the project summary data',
					webAddress: 'mock-web-address'
				});
			});

			it('should add 28 days to the DateOfDCOSubmission (2020-01-01)', () => {
				expect(response.DateOfDCOSubmission).toEqual('2020-01-29T00:00:00.000Z');
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
