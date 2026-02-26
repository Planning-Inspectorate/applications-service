const { getProjectSearchController, postProjectSearchController } = require('./controller');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getApplicationsFixture } = require('../_fixtures');
const { mockI18n } = require('../_mocks/i18n');

const commonTranslations_EN = require('../../locales/en/common.json');
const projectSearchTranslations_EN = require('./_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	projectSearch: projectSearchTranslations_EN
});

jest.mock('../../lib/application-api-wrapper', () => ({
	getAllProjectList: jest.fn()
}));

describe('pages/project-search/controller', () => {
	describe('#getProjectSearchController', () => {
		let req;
		let res;
		let next;

		beforeEach(() => {
			req = {
				i18n,
				query: {}
			};
			res = { render: jest.fn() };
			next = jest.fn();

			jest.resetAllMocks();
		});

		describe('#getProjectSearchController', () => {
			describe('When calling the get project search controller', () => {
				describe('and there is an issue', () => {
					beforeEach(async () => {
						await getAllProjectList.mockResolvedValue({ resp_code: 500 });
						await getProjectSearchController(req, res, next);
					});
					it('should render the error page', () => {
						expect(next).toHaveBeenCalledWith(new Error('Applications response status not 200'));
					});
				});
			});

			describe('and there are no issues', () => {
				beforeEach(async () => {
					await getAllProjectList.mockResolvedValue(getApplicationsFixture);
					await getProjectSearchController(req, res, next);
				});

				it('should call the correct template', async () => {
					expect(res.render).toHaveBeenCalledWith('project-search/view.njk', {
						activeFilters: [],
						applicationsDownloadURL: '/api/applications-download',
						totalApplicationsWithoutFilters: 21,
						applications: [
							{
								applicant: 'EDF',
								applicationDate: '1 Jan 2018',
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
								applicationDate: '1 Jan 2018',
								decisionDate: '',
								location: 'Somerset - cache test 03-02 15:44',
								pageURL: '/projects/tr033005',
								projectName: 'Azure Performance Test',
								stage: 'Acceptance'
							}
						],
						filters: [
							{
								idPrefix: 'region-option',
								isOpen: false,
								items: [
									{
										checked: false,
										label: 'North East',
										text: 'North East (1)',
										value: 'north_east'
									},
									{
										checked: false,
										label: 'Yorkshire and the Humber',
										text: 'Yorkshire and the Humber (1)',
										value: 'yorkshire_and_the_humber'
									},
									{
										checked: false,
										label: 'West Midlands',
										text: 'West Midlands (1)',
										value: 'west_midlands'
									},
									{
										checked: false,
										label: 'East Midlands',
										text: 'East Midlands (1)',
										value: 'east_midlands'
									},
									{
										checked: false,
										label: 'Eastern',
										text: 'Eastern (1)',
										value: 'eastern'
									},
									{
										checked: false,
										label: 'South West',
										text: 'South West (11)',
										value: 'south_west'
									},
									{
										checked: false,
										label: 'South East',
										text: 'South East (3)',
										value: 'south_east'
									},
									{
										checked: false,
										label: 'London',
										text: 'London (1)',
										value: 'london'
									},
									{
										checked: false,
										label: 'Wales',
										text: 'Wales (1)',
										value: 'wales'
									}
								],
								label: 'Location',
								name: 'region',
								title: 'Location',
								type: 'checkbox'
							},
							{
								idPrefix: 'sector-option',
								isOpen: false,
								items: [
									{ checked: false, label: 'Energy', text: 'Energy (16)', value: 'energy' },
									{ checked: false, label: 'Transport', text: 'Transport (5)', value: 'transport' }
								],
								label: 'Sector',
								name: 'sector',
								title: 'Sector',
								type: 'checkbox'
							},
							{
								idPrefix: 'stage-option',
								isOpen: false,
								items: [
									{
										checked: false,
										label: 'Pre-application',
										text: 'Pre-application (2)',
										value: 'pre_application'
									},
									{
										checked: false,
										label: 'Acceptance',
										text: 'Acceptance (1)',
										value: 'acceptance'
									},
									{
										checked: false,
										label: 'Pre-examination',
										text: 'Pre-examination (5)',
										value: 'pre_examination'
									},
									{
										checked: false,
										label: 'Examination',
										text: 'Examination (11)',
										value: 'examination'
									},
									{
										checked: false,
										label: 'Post-decision',
										text: 'Post-decision (2)',
										value: 'post_decision'
									}
								],
								label: 'Stage',
								name: 'stage',
								title: 'Stage',
								type: 'checkbox'
							}
						],
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
						relatedContentLinks: [
							{ name: 'Register of applications', url: '/register-of-applications' }
						],
						resultsPerPage: {
							fifty: { active: false, link: '?itemsPerPage=50', size: 50 },
							oneHundred: { active: false, link: '?itemsPerPage=100', size: 100 },
							twentyFive: { active: true, link: '?itemsPerPage=25', size: 25 }
						},
						sortByLinks: [
							{ link: '?sortBy=%2BProjectName&page=1', name: 'Project name', sort: 'none' },
							{ link: '?sortBy=%2BPromoterName&page=1', name: 'Applicant', sort: 'none' },
							{ link: '?sortBy=%2BStage&page=1', name: 'Stage', sort: 'none' }
						]
					});
				});
			});
		});
	});
	describe('#postProjectSearchController', () => {
		describe('When submitting selected filters on a project search page', () => {
			const req = {
				body: { 'mock-filter-1': 'mock filter value' }
			};
			const res = {
				redirect: jest.fn()
			};

			beforeEach(async () => {
				await postProjectSearchController(req, res);
			});
			it('should trigger a redirect', () => {
				expect(res.redirect).toHaveBeenCalledTimes(1);
			});
			it('should redirect back to documents page with correctly constructed query string from the request body', () => {
				expect(res.redirect).toHaveBeenCalledWith(
					'/project-search?mock-filter-1=mock%20filter%20value'
				);
			});
		});
	});
});
