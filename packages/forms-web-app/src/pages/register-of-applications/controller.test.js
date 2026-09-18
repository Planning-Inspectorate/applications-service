const { getRegisterOfApplicationsController } = require('./controller');

const { getAllProjectList } = require('../../lib/application-api-wrapper');

const { mockI18n } = require('../_mocks/i18n');

const registerOfApplicationsTranslations__EN = require('./_translations/en.json');

const { getApplicationsFixture } = require('../_fixtures');

jest.mock('../../lib/application-api-wrapper', () => ({
	getAllProjectList: jest.fn()
}));

const i18n = mockI18n({
	registerOfApplications: registerOfApplicationsTranslations__EN
});

describe('pages/register-of-applications/controller', () => {
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

	describe('#getRegisterOfApplicationsController', () => {
		describe('When calling the get register of applications controller', () => {
			describe('and there is an issue', () => {
				beforeEach(async () => {
					await getAllProjectList.mockResolvedValue({ resp_code: 500 });
					await getRegisterOfApplicationsController(req, res, next);
				});
				it('should render the error page', () => {
					expect(next).toHaveBeenCalledWith(new Error('Applications response status not 200'));
				});
			});
		});

		describe('and there are no issues', () => {
			beforeEach(async () => {
				await getAllProjectList.mockResolvedValue(getApplicationsFixture);
				await getRegisterOfApplicationsController(req, res, next);
			});

			it('should call the correct template', async () => {
				expect(res.render).toHaveBeenCalledWith('register-of-applications/view.njk', {
					applicationsDownloadURL: '/api/applications-download',
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
					query: {},
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
