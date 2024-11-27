const { getProjectsAllUpdatesController } = require('./controller');

const { getProjectUpdates } = require('../../../lib/application-api-wrapper');
const {
	getProjectUpdatesSuccessfulFixture,
	getProjectUpdatesUnsuccessfulFixture
} = require('../../_fixtures');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn()
}));

describe('pages/projects/all-updates/controller', () => {
	describe('#getProjectsAllUpdatesController', () => {
		describe('When there are no issues', () => {
			const req = {
				i18n: {
					lang: 'en'
				}
			};
			const res = {
				render: jest.fn(),
				locals: {
					caseRef: 'mock case ref',
					projectName: 'mock project name'
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockImplementation(() => getProjectUpdatesSuccessfulFixture);
				await getProjectsAllUpdatesController(req, res, next);
			});
			it('should call the project updates template with the correct data', () => {
				expect(res.render).toBeCalledWith('projects/all-updates/view.njk', {
					contentBackLinkUrl: '/projects/mock case ref',
					pageTitle: 'mock project name - All project updates',
					title: 'All project updates',
					updates: [
						{
							content: 'mock english content update 1',
							date: '1 January 2021'
						},
						{
							content: 'mock english content update 2',
							date: '2 February 2022'
						}
					]
				});
			});
		});
		describe('When there is an issue', () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					caseRef: 'mock case ref',
					projectName: 'mock project name'
				}
			};
			const next = jest.fn();

			beforeEach(async () => {
				getProjectUpdates.mockImplementation(() => getProjectUpdatesUnsuccessfulFixture);
				await getProjectsAllUpdatesController(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(new Error('Project updates response status not 200'));
			});
		});
	});
});
