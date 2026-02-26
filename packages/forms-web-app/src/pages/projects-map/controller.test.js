const { getProjectsMapController } = require('./controller');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getMapAccessToken } = require('../_services');
const { getApplicationsFixture } = require('../_fixtures');
const { mockI18n } = require('../_mocks/i18n');

const commonTranslations_EN = require('../../locales/en/common.json');
const projectSearchTranslations_EN = require('../project-search/_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	projectSearch: projectSearchTranslations_EN
});

jest.mock('../../lib/application-api-wrapper', () => ({
	getAllProjectList: jest.fn()
}));

jest.mock('../_services', () => ({
	getMapAccessToken: jest.fn()
}));

describe('pages/projects-map/controller', () => {
	let req, res, next;

	beforeEach(() => {
		req = { i18n, query: {} };
		res = { render: jest.fn() };
		next = jest.fn();
		jest.resetAllMocks();
	});

	it('renders view with filters and mapAccessToken', async () => {
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		expect(res.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				mapAccessToken: 'mock-token',
				projectSearchURL: '/project-search',
				query: {}
			})
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('calls next with error when getApplications fails', async () => {
		getAllProjectList.mockResolvedValue({ resp_code: 500 });
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
		expect(res.render).not.toHaveBeenCalled();
	});

	it('calls next with error when getMapAccessToken fails', async () => {
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockRejectedValue(new Error('token error'));

		await getProjectsMapController(req, res, next);

		expect(next).toHaveBeenCalledWith(expect.any(Error));
		expect(res.render).not.toHaveBeenCalled();
	});
});
