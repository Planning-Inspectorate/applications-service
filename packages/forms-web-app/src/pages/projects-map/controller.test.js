const { getProjectsMapController, postProjectsMapController } = require('./controller');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');
const { getApplications } = require('../../services/applications.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../services/applications.service');
jest.mock('../../utils/query-string-builder');
jest.mock('./utils/get-projects-map-query-string');
jest.mock('./utils/get-page-data');
jest.mock('../../config', () => ({
	logger: { level: 'info', redact: [] },
	maps: {
		leafletOptions: {
			minZoom: 0,
			maxZoom: 13,
			center: [52.3, -1.7],
			zoom: 0,
			attributionControl: true
		},
		tileLayer: {
			url: 'https://api.os.uk/maps/raster/v1/zxy/Light_27700/{z}/{x}/{y}.png',
			tokenEndpoint: '/api/os-maps/token',
			maxZoom: 13,
			attribution: '© Crown Copyright and database right'
		},
		crs: {
			code: 'EPSG:27700',
			proj4String:
				'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
			resolutions: [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75, 0.875, 0.4375, 0.21875, 0.109375],
			origin: [-238375.0, 1376256.0]
		},
		display: {
			clustered: true,
			elementId: 'projects-map',
			containerHeight: '700px',
			animateWhenZoomed: false
		}
	}
}));
jest.mock('../../lib/logger');
jest.mock('../project-search/utils/get-project-search-url', () => ({
	getProjectSearchURL: jest.fn(() => '/projects/search')
}));
jest.mock('./utils/get-projects-map-url', () => ({
	getProjectsMapURL: jest.fn(() => 'http://localhost:3000/projects-map')
}));

describe('pages/projects-map/controller', () => {
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockRes = {
			render: jest.fn().mockReturnValue(mockRes),
			status: jest.fn().mockReturnValue({ render: jest.fn().mockReturnValue(mockRes) }),
			redirect: jest.fn()
		};
		mockNext = jest.fn();
		jest.clearAllMocks();
	});

	const setupMocks = (applications = [], filters = [], totalItems = 0) => {
		const features = applications.map((app) => ({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
			properties: { caseRef: app.CaseReference, projectName: app.ProjectName }
		}));
		const geojson = { type: 'FeatureCollection', features };

		getApplications.mockResolvedValue({ applications, filters, pagination: { totalItems } });
		transformProjectsToGeoJSON.mockReturnValue(geojson);
	};

	describe('GET handler', () => {
		it('should render view with map config when projects exist', async () => {
			setupMocks([{ CaseReference: 'EN010001', ProjectName: 'Test', LongLat: [-1.5, 51.5] }]);
			const req = { i18n: {}, query: {} };

			await getProjectsMapController(req, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					mapConfig: expect.any(Object),
					projectSearchURL: '/projects/search'
				})
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should render view with empty markers', async () => {
			setupMocks();
			const req = { i18n: {}, query: {} };

			await getProjectsMapController(req, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalled();
		});

		it('should pass correct map config properties', async () => {
			setupMocks();
			const req = { i18n: {}, query: {} };

			await getProjectsMapController(req, mockRes, mockNext);

			const mapConfig = mockRes.render.mock.calls[0][1].mapConfig;
			expect(mapConfig).toHaveProperty('elementId');
			expect(mapConfig).toHaveProperty('mapOptions');
			expect(mapConfig).toHaveProperty('tileLayer');
			expect(mapConfig).toHaveProperty('crs');
			expect(mapConfig).toHaveProperty('markers');
			expect(mapConfig).toHaveProperty('clustered');
			expect(mapConfig).toHaveProperty('hasActiveFilters');
			expect(mapConfig).toHaveProperty('animateWhenZoomed');
		});

		it.each([
			[{}, false, 'no filters'],
			[{ region: 'london' }, true, 'region filter'],
			[{ sector: 'energy', stage: 'exam' }, true, 'multiple filters'],
			[{ search: 'test', pageNumber: '1' }, false, 'search params only']
		])('should set hasActiveFilters=%s when query=%s (%s)', async (query, expected) => {
			setupMocks();
			const req = { i18n: {}, query };

			await getProjectsMapController(req, mockRes, mockNext);

			const mapConfig = mockRes.render.mock.calls[0][1].mapConfig;
			expect(mapConfig.hasActiveFilters).toBe(expected);
		});

		it('should pass animateWhenZoomed from config', async () => {
			setupMocks();
			const req = { i18n: {}, query: {} };

			await getProjectsMapController(req, mockRes, mockNext);

			const mapConfig = mockRes.render.mock.calls[0][1].mapConfig;
			expect(mapConfig.animateWhenZoomed).toBe(false);
		});

		it('should pass error to next on service failure', async () => {
			const testError = new Error('Service failed');
			getApplications.mockRejectedValue(testError);

			await getProjectsMapController({ i18n: {}, query: {} }, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(testError);
			expect(mockRes.render).not.toHaveBeenCalled();
		});
	});

	describe('POST handler', () => {
		it('should redirect with query string', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');
			queryStringBuilder.mockReturnValue('?region=london');

			const req = { body: { region: 'london' } };
			await postProjectsMapController(req, mockRes);

			expect(mockRes.redirect).toHaveBeenCalledWith(
				'http://localhost:3000/projects-map?region=london'
			);
		});

		it('should handle errors and return 500 status', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');
			queryStringBuilder.mockImplementation(() => {
				throw new Error('Failed');
			});

			const req = { body: { region: 'london' } };
			await postProjectsMapController(req, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
		});
	});
});
