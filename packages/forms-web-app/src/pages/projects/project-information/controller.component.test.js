const supertest = require('supertest');
const HTMLParser = require('node-html-parser');
const fetch = require('node-fetch');
const app = require('../../../app');
const request = supertest(app);
const { getProjectUpdatesSuccessfulFixture } = require('../../_fixtures');

jest.mock('node-fetch');

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

const commonMockData = {
	ProjectName: 'Test project name',
	Proposal: 'I am the proposal',
	Summary: 'I am the project summary data',
	WebAddress: 'mock-web-address',
	dateOfNonAcceptance: '2020-01-01',
	AnticipatedDateOfSubmission: '2020-01-01',
	ProjectEmailAddress: 'mock@email.com'
};
describe('projects/project-information/controller.component', () => {
	describe('#getProjectInformation', () => {
		describe('Stages - test when stage is set that the details is expanded and the different permutation of the data is set', () => {
			describe('pre application ', () => {
				it('should render the page for pre application (stage 1) - with anticipatedDateOfSubmission', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										Stage: 1
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).toContain(
						'The application is expected to be submitted on 01 January 2020.'
					);
					expect(response.text).toMatchSnapshot();
				});
				it('should render the page for pre application (stage 1) - without anticipatedDateOfSubmission', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										AnticipatedDateOfSubmission: null,
										Stage: 1
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).not.toContain(
						'The application is expected to be submitted on 01 January 2021.'
					);
					expect(response.text).toMatchSnapshot();
				});
			});
			describe('acceptance', () => {
				it('should render the page for Acceptance (stage 2) - with DateOfDCOAcceptance_NonAcceptance', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										DateOfDCOSubmission: '2020-01-01',
										Stage: 2
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					//  Add 28 days to DateOfDCOSubmission
					expect(response.text).toContain(
						'The decision whether to accept the application for examination will be made by 29 January 2020.'
					);
					expect(response.text).toMatchSnapshot();
				});

				it('should render the page for Acceptance (stage 2) - without DateOfDCOAcceptance_NonAcceptance', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										DateOfDCOSubmission: null,
										Stage: 2
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).not.toContain(
						'The decision whether to accept the application for examination will be made by 02 January 2020.'
					);
					expect(response.text).toMatchSnapshot();
				});
			});
		});
		describe('Stage progress tag - test the stage progress tag has correct value depending on stage progress', () => {
			describe('Not started', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										AnticipatedDateOfSubmission: null,
										Stage: 1
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-acceptance .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('Not started');
					expect(response.text).toMatchSnapshot();
				});
			});
			describe('In progress', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										AnticipatedDateOfSubmission: null,
										Stage: 1
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-pre-application .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('In progress');
					expect(response.text).toMatchSnapshot();
				});
			});
			describe('Completed', () => {
				it('should render the pre application stage with correct project progress tag text', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
										AnticipatedDateOfSubmission: null,
										Stage: 3
									})
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve({ message: 'ignore this mock' })
							})
						)
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () => Promise.resolve(getProjectUpdatesSuccessfulFixture)
							})
						);
					const response = await request.get('/projects/EN010085');
					const element = HTMLParser.parse(response.text);
					const preApplicationStageTag = element.querySelector(
						'#project-stage-pre-application .govuk-tag'
					);

					expect(response.status).toEqual(200);
					expect(preApplicationStageTag.innerHTML).toContain('Completed');
					expect(response.text).toMatchSnapshot();
				});
			});
		});
	});
});
