const supertest = require('supertest');
const HTMLParser = require('node-html-parser');

const app = require('../../../app');
const request = supertest(app);
const { getProjectUpdatesSuccessfulFixture } = require('../../_fixtures');
const { getAppData } = require('../../../services/applications.service');
const {
	getTimetables,
	getProjectUpdates,
	getDocumentByType
} = require('../../../lib/application-api-wrapper');
const { getMapAccessToken } = require('../../_services');

jest.mock('../../../config', () => {
	const originalConfig = jest.requireActual('../../../config');
	return {
		...originalConfig,
		featureFlag: {
			...originalConfig.featureFlag,
			projectMigrationCaseReferences: ['EN010085']
		}
	};
});

jest.mock('../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn(),
	getProjectUpdates: jest.fn(),
	getDocumentByType: jest.fn()
}));

jest.mock('../../../services/applications.service', () => ({
	getAppData: jest.fn()
}));

jest.mock('../../_services', () => ({
	getMapAccessToken: jest.fn()
}));

const commonMockData = {
	ProjectName: 'Test project name',
	PromoterName: 'Test promoter name',
	Proposal: 'I am the proposal',
	Summary: 'I am the project summary data',
	WebAddress: 'mock-web-address',
	dateOfNonAcceptance: '2020-01-01',
	AnticipatedSubmissionDateNonSpecific: 'Q4 2023',
	ProjectEmailAddress: 'mock@email.com',
	LongLat: ['-0.118092', '51.509865'],
	MapZoomLevel: 5,
	ProjectLocation: 'mock project location'
};

describe('projects/project-information/controller.component', () => {
	describe('#getProjectInformation', () => {
		beforeEach(() => {
			getTimetables.mockResolvedValue({
				data: {
					message: 'ignore this mock'
				},
				resp_code: 200
			});

			getProjectUpdates.mockResolvedValue({
				data: {
					getProjectUpdatesSuccessfulFixture
				},
				resp_code: 200
			});
			getDocumentByType.mockResolvedValue({});
			getMapAccessToken.mockResolvedValue('mock map access token');
		});
		describe('Stages - test when stage is set that the details is expanded and the different permutation of the data is set', () => {
			describe('pre application ', () => {
				it('should render the page for pre application (stage 1) - with anticipatedSubmissionDateNonSpecific', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							Stage: 1
						},
						resp_code: 200
					});
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).toContain('The application is expected to be submitted in Q4 2023');
				});
				it('should render the page for pre application (stage 1) - without the time period section if anticipatedSubmissionDateNonSpecific is not available', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							AnticipatedSubmissionDateNonSpecific: null,
							Stage: 1
						},
						resp_code: 200
					});
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).not.toContain('The application is expected to be submitted');
				});
			});
			describe('acceptance', () => {
				it('should render the page for Acceptance (stage 2) - with DateOfDCOAcceptance_NonAcceptance', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							DateOfDCOSubmission: '2020-01-01',
							Stage: 2
						},
						resp_code: 200
					});

					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					//  Add 28 days to DateOfDCOSubmission
					expect(response.text).toContain(
						'The decision whether to accept the application for examination will be made by 29 January 2020.'
					);
				});

				it('should render the page for Acceptance (stage 2) - without DateOfDCOAcceptance_NonAcceptance', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							DateOfDCOSubmission: null,
							Stage: 2
						},
						resp_code: 200
					});

					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).not.toContain(
						'The decision whether to accept the application for examination will be made by 02 January 2020.'
					);
				});
			});
			describe('pre examination', () => {
				it('should render the page for Pre examination (stage 3) - Pre Reps', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							DateOfDCOSubmission: '2020-01-01',
							DateOfRepresentationPeriodOpen: null,
							Stage: 3
						},
						resp_code: 200
					});

					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).toContain(
						'This page will be updated when the registration period opens. You can view the project application documents to find out more about the application.'
					);
				});
			});
		});
		describe('Stage progress tag - test the stage progress tag has correct value depending on stage progress', () => {
			describe('Not started', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							Stage: 1
						},
						resp_code: 200
					});

					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-acceptance .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('Not started');
				});
			});
			describe('In progress', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							Stage: 1
						},
						resp_code: 200
					});

					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-pre-application .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('In progress');
				});
			});
			describe('Completed', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					getAppData.mockResolvedValue({
						data: {
							...commonMockData,
							Stage: 3
						},
						resp_code: 200
					});
					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-pre-application .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('Completed');
				});
			});
		});
	});
});
