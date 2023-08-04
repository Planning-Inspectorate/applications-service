const { getProjectOverview } = require('./controller');
const { getPageData } = require('./utils/get-page-data');
const { getProjectUpdates } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectUpdates: jest.fn()
}));
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));

describe('projects/project-information/controller', () => {
	describe('#getProjectOverview', () => {
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
			getProjectUpdates.mockImplementation(() => ({
				resp_code: 200,
				data: {
					updates: [
						{
							updateDate: '2021-01-01',
							updateName: 'mock update name 1',
							updateContentEnglish: 'mock english content update 1',
							updateContentWelsh: 'mock welsh content update 1'
						},
						{
							updateDate: '2022-02-02',
							updateName: 'mock update name 2',
							updateContentEnglish: 'mock english content update 2',
							updateContentWelsh: 'mock welsh content update 2'
						}
					]
				}
			}));
			getPageData.mockImplementation(() => ({
				proposal: 'Generating Stations',
				latestUpdate: {
					updateContentEnglish: 'mock english content update 1',
					updateContentWelsh: 'mock welsh content update 1',
					updateDate: '1 January 2021',
					updateName: 'mock update name 1'
				}
			}));
			await getProjectOverview(req, res, next);
		});

		it('should render the page', () => {
			expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
				latestUpdate: {
					updateContentEnglish: 'mock english content update 1',
					updateContentWelsh: 'mock welsh content update 1',
					updateDate: '1 January 2021',
					updateName: 'mock update name 1'
				},
				proposal: 'Generating Stations'
			});
		});
	});
});
