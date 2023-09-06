const { getRegisterOfApplications } = require('./controller');
const { getApplications } = require('../../services/applications.service');
const { applicationsDataFixture } = require('../_fixtures');

jest.mock('../../lib/application-api-wrapper');

jest.mock('../../services/applications.service', () => ({
	getApplications: jest.fn()
}));

describe('register-of-applications/controller', () => {
	let req;
	let res;
	let next;

	beforeEach(() => {
		req = {
			query: {}
		};
		res = { render: jest.fn() };
		next = jest.fn();

		jest.resetAllMocks();
	});

	describe('#getRegisterOfApplications', () => {
		describe('When calling the get register of applications controller', () => {
			describe('and there is an issue', () => {
				beforeEach(async () => {
					await getApplications.mockImplementation(() => {
						throw new Error('something went wrong');
					});

					await getRegisterOfApplications(req, res, next);
				});
				it('should render the error page', () => {
					expect(next).toHaveBeenCalledWith(new Error('something went wrong'));
				});
			});
		});

		describe('and there are no issues', () => {
			beforeEach(async () => {
				getApplications.mockResolvedValue({
					applications: applicationsDataFixture,
					pagination: {
						totalItems: 1,
						currentPage: 1,
						itemsPerPage: 25,
						totalPages: 1
					}
				});
				await getRegisterOfApplications(req, res, next);
			});

			it('should call the correct template', async () => {
				expect(res.render).toHaveBeenCalledWith('register-of-applications/view.njk', {
					applications: [
						{
							applicant: 'mock promoter first name 2 mock promoter last name 2',
							applicationDate: '',
							decisionDate: '',
							location: 'mock project location 2',
							pageURL: '/projects/mock case reference 2',
							projectName: 'mock project name 2',
							stage: 'Acceptance (review of the application)'
						}
					],
					pageHeading: 'Register of applications',
					pageTitle: 'Register of applications',
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
					paginationQueryString: '?page=:page',
					query: {},
					resultsPerPage: {
						fifty: { active: false, link: '?itemsPerPage=50', size: 50 },
						oneHundred: { active: false, link: '?itemsPerPage=100', size: 100 },
						twentyFive: { active: true, link: '?itemsPerPage=25', size: 25 }
					},
					sortByLinks: [
						{ link: '?sortBy=%2BProjectName&page=1', name: 'Project name', sort: 'none' },
						{ name: 'Location' },
						{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
						{
							link: '?sortBy=%2BDateOfDCOSubmission&page=1',
							name: 'Date of application',
							sort: 'none'
						},
						{
							link: '?sortBy=%2BConfirmedDateOfDecision&page=1',
							name: 'Date of decision',
							sort: 'none'
						},
						{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
					]
				});
			});
		});
	});
});
