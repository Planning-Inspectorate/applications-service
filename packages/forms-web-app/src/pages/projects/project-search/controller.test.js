const { getProjectSearch } = require('./controller');
const { getApplications } = require('../../../services/applications.service');

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
			query: 'test-query'
		};
		res = { render: jest.fn() };
		next = jest.fn;
		jest.resetAllMocks();
	});

	describe('#ProjectSearch', () => {
		it('should call the correct template', async () => {
			getApplications.mockResolvedValue({
				applications: [],
				pagination: {
					totalItems: 1,
					currentPage: 1,
					itemsPerPage: 25,
					totalPages: 1
				}
			});
			await getProjectSearch(req, res, next);
			expect(res.render).toHaveBeenCalledWith('projects/project-search/view.njk', {
				applications: [],
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
				paginationQueryString: '?',
				resultsPerPage: {
					fifty: { active: false, link: '?0=t&1=e&2=s&3=t&4=-&5=q&6=u&7=e&8=r&9=y', size: 50 },
					oneHundred: {
						active: false,
						link: '?0=t&1=e&2=s&3=t&4=-&5=q&6=u&7=e&8=r&9=y',
						size: 100
					},
					twentyFive: { active: true, link: '?0=t&1=e&2=s&3=t&4=-&5=q&6=u&7=e&8=r&9=y', size: 25 }
				},
				sortByLinks: [
					{ link: '?', name: 'Project name', sort: 'none' },
					{ link: '?', name: 'Applicant', sort: 'none' },
					{ link: '?', name: 'Stage', sort: 'none' }
				]
			});
		});
	});
});
