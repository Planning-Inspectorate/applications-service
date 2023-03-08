const projectSearchController = require('./project-search');
const { getAllProjectList } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper');

describe('controllers/project-search', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {};
		res = { render: jest.fn() };
		jest.resetAllMocks();
	});

	describe('getProjectList', () => {
		it('should call the correct template', async () => {
			getAllProjectList.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: [
						{
							ProjectName: 'test',
							CaseReference: 'test',
							PromoterName: 'test',
							Stage: 1
						}
					]
				})
			);
			await projectSearchController.getProjectList(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/project-search/index.njk', {
				appList: [
					{
						CaseReference: 'test',
						ProjectName: 'test',
						PromoterName: 'test',
						Stage: 'Pre-application'
					}
				],
				noOfProjects: 1
			});
		});
	});
});
