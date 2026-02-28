const {
	getProjectsMapController,
	postShowFiltersController,
	postHideFiltersController
} = require('./controller');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getMapAccessToken } = require('../_services');
const { getApplicationsFixture } = require('../_fixtures');
const { mockI18n } = require('../_mocks/i18n');

const commonTranslations_EN = require('../../locales/en/common.json');
const projectSearchTranslations_EN = require('../project-search/_translations/en.json');
const projectsMapTranslations_EN = require('./_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	projectSearch: projectSearchTranslations_EN,
	projectsMap: projectsMapTranslations_EN
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
		req = { i18n, query: {}, session: {} };
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
				query: {},
				showFilters: false,
				mapGeoJSON: expect.stringContaining('FeatureCollection')
			})
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('passes showFilters=true when session flag is set', async () => {
		req.session.projectsMapShowFilters = true;
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		expect(res.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({ showFilters: true })
		);
	});

	it('includes correct stage labels in mapGeoJSON', async () => {
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		const { mapGeoJSON } = res.render.mock.calls[0][1];
		const geojson = JSON.parse(mapGeoJSON);
		const stages = geojson.features.map((f) => f.properties.stage);
		expect(stages).toContain('Examination'); // Stage: 4
		expect(stages).toContain('Pre-application'); // Stage: 1
		expect(stages).toContain('Acceptance'); // Stage: 2
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

	describe('postShowFiltersController', () => {
		it('sets session flag and redirects', () => {
			req.query = { sector: 'energy' };
			res.redirect = jest.fn();
			postShowFiltersController(req, res);
			expect(req.session.projectsMapShowFilters).toBe(true);
			expect(res.redirect).toHaveBeenCalledWith('/projects-map?sector=energy');
		});
	});

	describe('postHideFiltersController', () => {
		it('clears session flag and redirects', () => {
			req.session.projectsMapShowFilters = true;
			req.query = { sector: 'energy' };
			res.redirect = jest.fn();
			postHideFiltersController(req, res);
			expect(req.session.projectsMapShowFilters).toBeUndefined();
			expect(res.redirect).toHaveBeenCalledWith('/projects-map?sector=energy');
		});
	});
});
