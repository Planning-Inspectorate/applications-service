const supertest = require('supertest');
const app = require('../../../app');

const fetch = require('node-fetch');
jest.mock('node-fetch');
const request = supertest(app);

const commonMockData = {
	ProjectName: 'Test project name',
	Proposal: 'I am the proposal',
	Summary: 'I am the project summary data',
	WebAddress: 'mock-web-address',
	dateOfNonAcceptance: '2020-01-01',
	AnticipatedDateOfSubmission: '2020-01-01',
	ProjectEmailAddress: 'mock@email.com'
};
describe('projects/project-information/controller', () => {
	describe('#getProjectOverview', () => {
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
				it('should render the page for Acceptance (stage 2)', async () => {
					fetch
						.mockImplementationOnce(() =>
							Promise.resolve({
								ok: true,
								status: 200,
								json: () =>
									Promise.resolve({
										...commonMockData,
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
						);
					const response = await request.get('/projects/EN010085');

					expect(response.status).toEqual(200);
					expect(response.text).toMatchSnapshot();
				});
			});
		});
	});
});
