const { getApplicationData } = require('./get-application-data');
const { getAppData } = require('../../../services/applications.service');
jest.mock('../../../services/applications.service', () => ({
	getAppData: jest.fn()
}));

const commonMockData = {
	ProjectName: 'mock project name',
	Proposal: 'I am the proposal',
	Summary: 'I am the project summary data',
	WebAddress: 'mock-web-address',
	dateOfNonAcceptance: '2020-01-01',
	ProjectEmailAddress: 'mock@email.com',
	DateOfDCOSubmission: '2020-01-01',
	DateOfRepresentationPeriodOpen: '2020-01-01',
	DateOfRelevantRepresentationClose: '2020-01-01',
	DateRRepAppearOnWebsite: '2020-01-01',
	DateOfPreliminaryMeeting: '2020-01-01',
	isMaterialChange: false
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
					contactEmailAddress: 'mock@email.com',
					dateOfNonAcceptance: '2020-01-01',
					projectName: 'mock project name',
					proposal: 'I am the proposal',
					DateOfDCOSubmission: '2020-01-29T00:00:00.000Z',
					status: {
						number: 1,
						text: 'Pre-application'
					},
					DateOfPreliminaryMeeting: '2020-01-01',
					DateOfRelevantRepresentationClose: '2020-01-01',
					DateOfRepresentationPeriodOpen: '2020-01-01',
					DateRRepAppearOnWebsite: '2020-01-01',
					summary: 'I am the project summary data',
					webAddress: 'mock-web-address',
					isMaterialChange: false
				});
			});

			it('should add 28 days to the DateOfDCOSubmission (2020-01-01)', () => {
				expect(response.DateOfDCOSubmission).toEqual('2020-01-29T00:00:00.000Z');
			});
		});
		describe('and the dates are 0000-00-00', () => {
			let response;
			beforeEach(async () => {
				getAppData.mockReturnValue({
					data: {
						...commonMockData,
						dateOfNonAcceptance: '0000-00-00',
						DateOfDCOSubmission: '0000-00-00',
						DateOfRepresentationPeriodOpen: '0000-00-00',
						DateOfRelevantRepresentationClose: '0000-00-00',
						DateRRepAppearOnWebsite: '0000-00-00',
						DateOfPreliminaryMeeting: '0000-00-00',
						Stage: 1
					},
					resp_code: 200
				});
				response = await getApplicationData('mock case ref');
			});
			it('should return the project name in an object', () => {
				expect(response).toEqual({
					contactEmailAddress: 'mock@email.com',
					dateOfNonAcceptance: null,
					projectName: 'mock project name',
					proposal: 'I am the proposal',
					DateOfDCOSubmission: null,
					DateOfPreliminaryMeeting: null,
					DateOfRelevantRepresentationClose: null,
					DateOfRepresentationPeriodOpen: null,
					DateRRepAppearOnWebsite: null,
					status: {
						number: 1,
						text: 'Pre-application'
					},
					summary: 'I am the project summary data',
					webAddress: 'mock-web-address',
					isMaterialChange: false
				});
			});
		});
		describe('and the summary contains line breaks', () => {
			let response;
			const summary = `My list of items:
    • Item 1
    • Item 2
    • Item 3
    • Item 4`;
			beforeEach(async () => {
				getAppData.mockReturnValue({
					data: {
						...commonMockData,
						Summary: summary,
						Stage: 1
					},
					resp_code: 200
				});
				response = await getApplicationData('mock case ref');
			});
			it('should preserve formatting', () => {
				expect(response.summary).toEqual(
					'My list of items:<br>    • Item 1<br>    • Item 2<br>    • Item 3<br>    • Item 4'
				);
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
