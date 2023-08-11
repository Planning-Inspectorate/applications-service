const { getProjectInformation } = require('./controller');

const { getProjectUpdates, getDocumentByType } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn(),
	getDocumentByType: jest.fn()
}));

const {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture,
	getProjectUpdatesUnsuccessfulFixture
} = require('../../_fixtures');

describe('projects/project-information/controller.unit', () => {
	const today = '2020-01-01';
	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(new Date(today));
	});

	describe('#getProjectInformation', () => {
		describe('When project updates are NOT found', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: {
						projectName: 'Mock project name',
						caseRef: 'EN010085',
						summary: 'Mock case summary',
						webAddress: 'www.mock.com',
						proposal: 'EN01 - Generating Stations'
					}
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockImplementation(() => getProjectUpdatesUnsuccessfulFixture);
				getDocumentByType.mockResolvedValue({});
				await getProjectInformation(req, res, next);
			});

			it('should throw an error', () => {
				expect(next).toHaveBeenCalledWith(new Error('Project updates response status not 200'));
			});
		});

		describe('When there are project updates', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: {
						projectName: 'Mock project name',
						caseRef: 'EN010085',
						summary: 'Mock case summary',
						webAddress: 'www.mock.com',
						proposal: 'EN01 - Generating Stations'
					}
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockImplementation(() => getProjectUpdatesSuccessfulFixture);
				getDocumentByType.mockResolvedValue({});
				await getProjectInformation(req, res, next);
			});

			it('should render the page with the latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
					latestUpdate: {
						content: 'mock english content update 1',
						date: '1 January 2021'
					},
					proposal: 'Generating Stations',
					rule6Document: undefined,
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: false,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					}
				});
			});
		});

		describe('When there are project updates', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: {
						projectName: 'Mock project name',
						caseRef: 'EN010085',
						summary: 'Mock case summary',
						webAddress: 'www.mock.com',
						proposal: 'EN01 - Generating Stations'
					}
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockImplementation(() => getProjectUpdatesSuccessfulNoUpdatesFixture);
				getDocumentByType.mockResolvedValue({});
				await getProjectInformation(req, res, next);
			});

			it('should render the page with NO latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
					latestUpdate: null,
					proposal: 'Generating Stations',
					rule6Document: undefined,
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: false,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					}
				});
			});
		});
	});
});
