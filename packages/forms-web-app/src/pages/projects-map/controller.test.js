const { getProjectsMapController, postProjectsMapController } = require('./controller');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');
const { getApplications } = require('../../services/applications.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../services/applications.service');
jest.mock('../../utils/query-string-builder');
jest.mock('./utils/get-projects-map-query-string');
jest.mock('./utils/get-page-data');
jest.mock('../../config', () => ({
	logger: {
		level: 'info',
		redact: []
	},
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
			containerHeight: '700px'
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
		mockRes = { render: jest.fn() };
		mockNext = jest.fn();
		jest.clearAllMocks();
	});

	describe('success', () => {
		it('should render view with map configuration', async () => {
			const mockApplications = [
				{
					CaseReference: 'EN010001',
					ProjectName: 'Test Project',
					LongLat: [-1.5, 51.5],
					Stage: 'examination'
				}
			];

			const mockGeojson = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
						properties: { caseRef: 'EN010001', projectName: 'Test Project' }
					}
				]
			};

			getApplications.mockResolvedValue({
				applications: mockApplications,
				filters: [],
				pagination: { totalItems: 1 }
			});

			transformProjectsToGeoJSON.mockReturnValue(mockGeojson);

			const mockReq = { i18n: {}, query: {} };

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(getApplications).toHaveBeenCalled();
			expect(transformProjectsToGeoJSON).toHaveBeenCalled();
			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					mapConfig: expect.any(Object),
					projectSearchURL: '/projects/search'
				})
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should render view with empty markers when no projects exist', async () => {
			const emptyGeojson = {
				type: 'FeatureCollection',
				features: []
			};

			getApplications.mockResolvedValue({
				applications: [],
				filters: [],
				pagination: { totalItems: 0 }
			});

			transformProjectsToGeoJSON.mockReturnValue(emptyGeojson);

			const mockReq = { i18n: {}, query: {} };

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalled();
			expect(mockNext).not.toHaveBeenCalled();
		});
	});

	describe('error handling', () => {
		it('should pass error to Express error handler when service fails', async () => {
			const testError = new Error('Service failed');
			getApplications.mockRejectedValue(testError);

			const mockReq = { i18n: {}, query: {} };

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(testError);
			expect(mockRes.render).not.toHaveBeenCalled();
		});

		it('should not render view on error', async () => {
			getApplications.mockRejectedValue(new Error('Database error'));

			const mockReq = { i18n: {}, query: {} };

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockRes.render).not.toHaveBeenCalled();
		});
	});

	describe('POST handler', () => {
		it('should redirect with query string from form body', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');
			queryStringBuilder.mockReturnValue('?region=london');

			const mockReq = { body: { region: 'london' } };
			mockRes.redirect = jest.fn();

			await postProjectsMapController(mockReq, mockRes);

			expect(queryStringBuilder).toHaveBeenCalledWith({ region: 'london' }, ['region']);
			expect(mockRes.redirect).toHaveBeenCalledWith(
				'http://localhost:3000/projects-map?region=london'
			);
		});

		it('should render error page on failure', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');
			queryStringBuilder.mockImplementation(() => {
				throw new Error('Failed');
			});

			const mockReq = { body: { region: 'london' } };
			mockRes.status = jest.fn().mockReturnValue(mockRes);
			mockRes.render = jest.fn();

			await postProjectsMapController(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.render).toHaveBeenCalledWith('error/unhandled-exception');
		});
	});
});
