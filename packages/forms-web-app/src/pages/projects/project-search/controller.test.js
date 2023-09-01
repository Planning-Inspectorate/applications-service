const { getProjectSearch } = require('./controller');
const { getApplications } = require('../../../services/applications.service');
const { applicationsDataFixture } = require('../../_fixtures');

jest.mock('../../../lib/application-api-wrapper');

jest.mock('../../../services/applications.service', () => ({
	getApplications: jest.fn()
}));

describe('controllers/project-search', () => {
	let req;
	let res;
	let next;

	beforeEach(() => {
		req = {
			query: { sortBy: '-applicant', itemsPerPage: '25' }
		};
		res = { render: jest.fn() };
		next = jest.fn;
		jest.resetAllMocks();
	});

	describe('#ProjectSearch', () => {
		it('should call the correct template', async () => {
			getApplications.mockResolvedValue({
				applications: applicationsDataFixture,
				pagination: {
					totalItems: 1,
					currentPage: 1,
					itemsPerPage: 25,
					totalPages: 1
				}
			});
			await getProjectSearch(req, res, next);
			expect(res.render).toHaveBeenCalledWith('projects/project-search/view.njk', {
				applications: [
					{
						applicant: 'EDF',
						pageURL: '/projects/TR010001',
						projectName: 'Accessibility Test',
						stage: 'Examination'
					},
					{
						applicant: 'John Agent Burke',
						pageURL: '/projects/TR023024',
						projectName: 'April 7 2020',
						stage: 'Pre-application'
					}
				],
				pagination: {
					pageOptions: [1],
					paginationData: {
						currentPage: 1,
						fromRange: 1,
						itemsPerPage: 25,
						toRange: 1,
						totalItems: 1,
						totalPages: 1
					}
				},
				paginationQueryString: '?sortBy=-applicant&itemsPerPage=25&page=:page',
				resultsPerPage: {
					fifty: {
						active: false,
						link: '?sortBy=-applicant&itemsPerPage=50',
						size: 50
					},
					oneHundred: {
						active: false,
						link: '?sortBy=-applicant&itemsPerPage=100',
						size: 100
					},
					twentyFive: {
						active: true,
						link: '?sortBy=-applicant&itemsPerPage=25',
						size: 25
					}
				},
				sortByLinks: [
					{
						link: '?sortBy=%2BprojectName&itemsPerPage=25',
						name: 'Project name',
						sort: 'none'
					},
					{
						link: '?sortBy=%2Bapplicant&itemsPerPage=25',
						name: 'Applicant',
						sort: 'descending'
					},
					{
						link: '?sortBy=%2Bstage&itemsPerPage=25',
						name: 'Stage',
						sort: 'none'
					}
				]
			});
		});
	});
});
