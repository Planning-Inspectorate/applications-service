const { getProjectInformation } = require('./controller');

const { getProjectUpdates, getDocumentByType } = require('../../../lib/application-api-wrapper');

const {
	getProjectUpdatesUnsuccessfulFixture,
	applicationDataFixture,
	getProjectUpdatesSuccessfulFixture,
	getApplicationApprovalDocumentFixture,
	getProjectUpdatesSuccessfulNoUpdatesFixture
} = require('../../_fixtures');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn(),
	getDocumentByType: jest.fn()
}));

describe('projects/project-information/controller', () => {
	describe('#getProjectInformation', () => {
		const today = '2020-01-01';

		beforeAll(() => {
			jest.useFakeTimers().setSystemTime(new Date(today));
		});

		describe('When project updates are NOT found', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: applicationDataFixture
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesUnsuccessfulFixture);
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
					applicationData: applicationDataFixture
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesSuccessfulFixture);
				getDocumentByType
					.mockReturnValueOnce({})
					.mockReturnValueOnce({})
					.mockReturnValueOnce(getApplicationApprovalDocumentFixture);

				await getProjectInformation(req, res, next);
			});

			it('should render the page with the latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
					applicationDecision: 'granted',
					latestUpdate: { content: 'mock english content update 1', date: '1 January 2021' },
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: false,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					},
					proposal: 'Generating Stations',
					rule6Document: undefined
				});
			});
		});

		describe('When there are NO project updates', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: applicationDataFixture
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockReturnValue(getProjectUpdatesSuccessfulNoUpdatesFixture);
				getDocumentByType
					.mockReturnValueOnce({})
					.mockReturnValueOnce({})
					.mockReturnValueOnce(getApplicationApprovalDocumentFixture);

				await getProjectInformation(req, res, next);
			});

			it('should render the page with NO latest update', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
					applicationDecision: 'granted',
					latestUpdate: null,
					preExamSubStages: {
						CLOSED_REPS: false,
						OPEN_REPS: false,
						PRE_REPS: false,
						PUBLISHED_REPS: false,
						RULE_6_PUBLISHED_REPS: false
					},
					proposal: 'Generating Stations',
					rule6Document: undefined
				});
			});
		});
	});
});
