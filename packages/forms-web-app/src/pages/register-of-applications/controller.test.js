const { getRegisterOfApplications } = require('./controller');

const { getAllProjectList } = require('../../lib/application-api-wrapper');

const { getApplicationsFixture } = require('../_fixtures');

jest.mock('../../lib/application-api-wrapper', () => ({
	getAllProjectList: jest.fn()
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
					await getAllProjectList.mockResolvedValue({ resp_code: 500 });
					await getRegisterOfApplications(req, res, next);
				});
				it('should render the error page', () => {
					expect(next).toHaveBeenCalledWith(new Error('Applications response status not 200'));
				});
			});
		});

		describe('and there are no issues', () => {
			beforeEach(async () => {
				await getAllProjectList.mockResolvedValue(getApplicationsFixture);
				await getRegisterOfApplications(req, res, next);
			});

			it('should call the correct template', async () => {
				expect(res.render).toHaveBeenCalledWith('register-of-applications/view.njk', {
					allProjectsSubNavigationRoutes: {
						projectSearch: '/project-search',
						registerOfApplications: '/register-of-applications'
					},
					applicationsDownloadURL: '/api/applications-download',
					totalApplicationsWithoutFilters: 21,
					applications: [
						{
							applicant: 'EDF',
							applicationDate: '01 Jan 2018',
							decisionDate: '',
							location: 'Somerset - Monday PM 23/12',
							pageURL: '/projects/TR010001',
							projectName: 'Accessibility Test',
							stage: 'Examination'
						},
						{
							applicant: 'John Agent Burke',
							applicationDate: '',
							decisionDate: '',
							location: 'Bristol',
							pageURL: '/projects/TR023024',
							projectName: 'April 7 2020',
							stage: 'Pre-application'
						},
						{
							applicant: 'EDF',
							applicationDate: '01 Jan 2018',
							decisionDate: '',
							location: 'Somerset - cache test 03-02 15:44',
							pageURL: '/projects/tr033005',
							projectName: 'Azure Performance Test',
							stage: 'Acceptance (review of the application)'
						}
					],
					pageHeading: 'Register of applications',
					pageTitle: 'Register of applications',
					pagination: {
						pageOptions: [1, 2, 3, '...', 7, 'next'],
						paginationData: {
							currentPage: 1,
							fromRange: 1,
							itemsPerPage: 3,
							toRange: 3,
							totalItems: 21,
							totalPages: 7
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
