const { getApplicationData } = require('./get-application-data');
const { getProjectData } = require('../../../lib/application-api-wrapper');
jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectData: jest.fn()
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
				getProjectData.mockReturnValue({
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

			describe('and the application is a material change project', () => {
				const mockProjectData = {
					data: {
						...commonMockData,
						isMaterialChange: true
					},
					resp_code: 200
				};

				describe('and the application is in the Pre-application stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 1;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Pre-application status values', () => {
						expect(response.status).toEqual({ number: 1, text: 'Pre-application' });
					});
				});

				describe('and the application is in the Application received stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 2;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Application received status values', () => {
						expect(response.status).toEqual({ number: 2, text: 'Application received' });
					});
				});

				describe('and the application is in the Application published stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 3;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Application published status values', () => {
						expect(response.status).toEqual({ number: 3, text: 'Application published' });
					});
				});

				describe('and the application is in the Examination stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 4;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Examination status values', () => {
						expect(response.status).toEqual({ number: 4, text: 'Examination' });
					});
				});

				describe('and the application is in the Recommendation stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 5;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Recommendation status values', () => {
						expect(response.status).toEqual({ number: 5, text: 'Recommendation' });
					});
				});

				describe('and the application is in the Decision stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 6;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Decision status values', () => {
						expect(response.status).toEqual({ number: 6, text: 'Decision' });
					});
				});

				describe('and the application is in the Post-decision stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 7;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Post-decision status values', () => {
						expect(response.status).toEqual({
							number: 7,
							text: 'What happens after the decision is made'
						});
					});
				});

				describe('and the application is in the Withdrawn stage', () => {
					beforeEach(async () => {
						mockProjectData.data.Stage = 8;
						getProjectData.mockReturnValue(mockProjectData);
						response = await getApplicationData('mock case ref');
					});

					it('should return the formatted Withdrawn status values', () => {
						expect(response.status).toEqual({
							number: 8,
							text: 'Withdrawn'
						});
					});
				});
			});
		});

		describe('and the dates are 0000-00-00', () => {
			let response;
			beforeEach(async () => {
				getProjectData.mockReturnValue({
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
				getProjectData.mockReturnValue({
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
				getProjectData.mockReturnValue({ data: 'mock data', resp_code: 500 });
			});
			it('should throw an error', async () => {
				await expect(getApplicationData('mock-case-ref')).rejects.toThrow(
					'Application response status not 200'
				);
			});
		});
	});
});
