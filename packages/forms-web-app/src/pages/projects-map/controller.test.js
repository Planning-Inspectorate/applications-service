const { Readable } = require('stream');
const { maps } = require('../../config');
const {
	getProjectsMapController,
	postProjectsMapController,
	downloadMasterGeoJsonController,
	getMasterGeoJsonController
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

jest.mock('../../config', () => {
	const actualConfig = jest.requireActual('../../config');
	return {
		...actualConfig,
		maps: {
			...actualConfig.maps,
			masterGeoJsonUrl: 'https://example.com/test.geojson'
		}
	};
});

describe('pages/projects-map/controller', () => {
	let req, res, next;

	beforeEach(() => {
		jest.resetAllMocks();

		req = { i18n, query: {}, body: {}, session: {}, url: '/projects-map', headers: {} };
		res = {
			render: jest.fn(),
			setHeader: jest.fn(),
			set: jest.fn(),
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
			json: jest.fn()
		};
		next = jest.fn();

		global.fetch = jest.fn();
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
				queryString: '',
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

	it('excludes empty searchTerm from queryString', async () => {
		req.query = { searchTerm: '', region: 'wales' };
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		expect(res.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				queryString: '?region=wales'
			})
		);
	});

	it('includes searchTerm in queryString when it has a value', async () => {
		req.query = { searchTerm: 'wind', region: 'wales' };
		getAllProjectList.mockResolvedValue(getApplicationsFixture);
		getMapAccessToken.mockResolvedValue('mock-token');

		await getProjectsMapController(req, res, next);

		expect(res.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				queryString: '?region=wales&searchTerm=wind'
			})
		);
	});

	describe('postProjectsMapController', () => {
		it('toggles filter visibility and redirects using referrer query string', async () => {
			req.session.projectsMapShowFilters = true;
			req.body = { filterToggleValue: 'true' };
			req.get = jest.fn().mockReturnValue('http://localhost:9004/projects-map?region=wales');
			res.redirect = jest.fn();

			await postProjectsMapController(req, res, next);

			expect(req.session.projectsMapShowFilters).toBe(false);
			expect(res.redirect).toHaveBeenCalledWith('/projects-map?region=wales');
		});

		it('handles empty referrer gracefully', async () => {
			req.body = { filterToggleValue: 'false' };
			req.get = jest.fn().mockReturnValue('');
			res.redirect = jest.fn();

			await postProjectsMapController(req, res, next);

			expect(req.session.projectsMapShowFilters).toBe(true);
			expect(res.redirect).toHaveBeenCalledWith('/projects-map');
		});
	});

	describe('downloadMasterGeoJsonController', () => {
		it('streams the GeoJson file as a download', async () => {
			const mockPipe = jest.fn();

			const mockNodeStream = {
				pipe: mockPipe
			};

			jest.spyOn(Readable, 'fromWeb').mockReturnValue(mockNodeStream);

			fetch.mockResolvedValue({
				ok: true,
				body: {}
			});

			await downloadMasterGeoJsonController(req, res, next);

			expect(fetch).toHaveBeenCalled();

			expect(res.setHeader).toHaveBeenCalledWith(
				'Content-Disposition',
				'attachment; filename="all-project-boundaries.geojson"'
			);

			expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/geo+json');

			expect(Readable.fromWeb).toHaveBeenCalledWith({});

			expect(mockPipe).toHaveBeenCalledWith(res);

			expect(next).not.toHaveBeenCalled();
		});

		it('calls next when fetch rejects', async () => {
			fetch.mockRejectedValue(new Error('download failed'));

			await downloadMasterGeoJsonController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));

			expect(res.setHeader).not.toHaveBeenCalled();
		});

		it('calls next when response is not ok', async () => {
			fetch.mockResolvedValue({
				ok: false,
				status: 500
			});

			await downloadMasterGeoJsonController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));

			expect(res.setHeader).not.toHaveBeenCalled();
		});

		it('calls next when response body is missing', async () => {
			fetch.mockResolvedValue({
				ok: true,
				body: undefined
			});

			await downloadMasterGeoJsonController(req, res, next);

			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					message: 'geoJson response body missing'
				})
			);
		});
	});

	describe('getMasterGeoJsonController', () => {
		it('returns geojson with cache headers', async () => {
			const mockGeoJson = {
				type: 'FeatureCollection',
				features: []
			};

			fetch
				.mockResolvedValueOnce({
					ok: true,
					headers: {
						get: jest.fn().mockImplementation((header) => {
							if (header === 'etag') {
								return 'test-etag';
							}

							if (header === 'last-modified') {
								return 'yesterday';
							}

							return null;
						})
					}
				})
				.mockResolvedValueOnce({
					ok: true,
					json: jest.fn().mockResolvedValue(mockGeoJson)
				});

			await getMasterGeoJsonController(req, res, next);

			expect(fetch).toHaveBeenNthCalledWith(1, maps.masterGeoJsonUrl, { method: 'HEAD' });

			expect(fetch).toHaveBeenNthCalledWith(2, expect.any(String));

			expect(res.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=0, must-revalidate');

			expect(res.setHeader).toHaveBeenCalledWith('ETag', 'test-etag');

			expect(res.setHeader).toHaveBeenCalledWith('Last-Modified', 'yesterday');

			expect(res.json).toHaveBeenCalledWith(mockGeoJson);

			expect(next).not.toHaveBeenCalled();
		});

		it('returns 304 when etag matches request header', async () => {
			req.headers = {
				'if-none-match': 'matching-etag'
			};

			fetch.mockResolvedValue({
				ok: true,
				headers: {
					get: jest.fn().mockImplementation((header) => {
						if (header === 'etag') {
							return 'matching-etag';
						}

						return null;
					})
				}
			});

			await getMasterGeoJsonController(req, res, next);

			expect(res.status).toHaveBeenCalledWith(304);

			expect(res.send).toHaveBeenCalled();

			expect(res.json).not.toHaveBeenCalled();

			expect(next).not.toHaveBeenCalled();
		});

		it('calls next when HEAD request fails', async () => {
			fetch.mockResolvedValue({
				ok: false,
				status: 500
			});

			await getMasterGeoJsonController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));

			expect(res.json).not.toHaveBeenCalled();
		});

		it('calls next when geojson fetch fails', async () => {
			fetch
				.mockResolvedValueOnce({
					ok: true,
					headers: {
						get: jest.fn()
					}
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 500
				});

			await getMasterGeoJsonController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
