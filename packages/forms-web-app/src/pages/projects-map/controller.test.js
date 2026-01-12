const { getProjectsMapController, postProjectsMapController } = require('./controller');
const { getApplications } = require('../../services/applications.service');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../services/applications.service');
jest.mock('../../services/projects-map.service');
jest.mock('../../config', () => ({
	logger: {
		level: 'info',
		redact: []
	},
	maps: {
		osMapsApiKey: 'test-key',
		osMapsApiSecret: 'test-secret',
		leafletOptions: {
			minZoom: 7,
			maxZoom: 20,
			center: [51.8086, -1.7139],
			zoom: 7,
			attributionControl: true
		},
		restrictToUk: {
			enabled: false,
			bounds: [
				[49.528423, -10.76418],
				[61.331151, 1.9134116]
			],
			viscosity: 1.0
		},
		tileLayer: {
			url: 'https://api.os.uk/maps/raster/v1/zxy/Light_3857/{z}/{x}/{y}.png',
			tokenEndpoint: '/api/os-maps/token',
			maxZoom: 20,
			attribution: '© Crown Copyright and database right'
		},
		display: {
			clustered: true,
			elementId: 'map',
			containerHeight: '550px'
		}
	}
}));
jest.mock('../../lib/logger');
jest.mock('../project-search/utils/get-project-search-url', () => ({
	getProjectSearchURL: jest.fn(() => '/project-search')
}));
jest.mock('../../utils/query-string-builder');
jest.mock('./utils/get-projects-map-url');
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn(() => ({
		filters: [],
		activeFilters: [],
		pagination: { totalItems: 0, currentPage: 1, totalPages: 1 }
	}))
}));

describe('pages/projects-map/controller', () => {
	let mockRes;
	let mockNext;
	let mockI18n;

	beforeEach(() => {
		mockRes = { render: jest.fn() };
		mockNext = jest.fn();
		mockI18n = { language: 'en', t: jest.fn((key) => key) };
		jest.clearAllMocks();
	});

	describe('getProjectsMapController', () => {
		it('should render view with filtered project data', async () => {
			const mockApplications = [
				{ id: 1, name: 'Project 1', LongLat: [-1.5, 51.5], CaseReference: 'EN010001' }
			];
			const mockFilters = [{ name: 'region', value: 'london', label: 'London', count: 5 }];
			const mockPagination = { totalItems: 1, currentPage: 1, totalPages: 1 };

			getApplications.mockResolvedValue({
				applications: mockApplications,
				filters: mockFilters,
				pagination: mockPagination
			});

			const mockGeojson = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
						properties: { caseRef: 'EN010001', projectName: 'Project 1' }
					}
				]
			};

			transformProjectsToGeoJSON.mockReturnValue(mockGeojson);

			const { getPageData } = require('./utils/get-page-data');
			getPageData.mockImplementation(() => ({
				filters: mockFilters,
				activeFilters: [],
				pagination: mockPagination
			}));

			await getProjectsMapController({ i18n: mockI18n, query: {} }, mockRes, mockNext);

			expect(getApplications).toHaveBeenCalled();
			expect(transformProjectsToGeoJSON).toHaveBeenCalledWith(mockApplications);
			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					mapConfig: expect.objectContaining({
						elementId: 'map',
						markers: expect.any(Array),
						totalProjects: 1
					}),
					projectSearchURL: '/project-search'
				})
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should handle service errors', async () => {
			getApplications.mockRejectedValueOnce(new Error('Service failed'));

			await getProjectsMapController({ i18n: mockI18n, query: {} }, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
			expect(mockRes.render).not.toHaveBeenCalled();
		});

		it('should handle empty projects array', async () => {
			getApplications.mockResolvedValue({
				applications: [],
				filters: [],
				pagination: { totalItems: 0, currentPage: 1, totalPages: 1 }
			});

			transformProjectsToGeoJSON.mockReturnValue({
				type: 'FeatureCollection',
				features: []
			});

			await getProjectsMapController({ i18n: mockI18n, query: {} }, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					mapConfig: expect.objectContaining({
						totalProjects: 0,
						markers: []
					})
				})
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should pass filters data to view', async () => {
			const mockApplications = [{ id: 1, name: 'Project 1', LongLat: [-1.5, 51.5] }];
			const mockFilters = [
				{ name: 'region', value: 'london', label: 'London', count: 5 },
				{ name: 'sector', value: 'energy', label: 'Energy', count: 3 }
			];

			getApplications.mockResolvedValue({
				applications: mockApplications,
				filters: mockFilters,
				pagination: { totalItems: 1, currentPage: 1, totalPages: 1 }
			});

			transformProjectsToGeoJSON.mockReturnValue({
				type: 'FeatureCollection',
				features: []
			});

			const { getPageData } = require('./utils/get-page-data');
			getPageData.mockImplementation(() => ({
				filters: mockFilters,
				activeFilters: [],
				pagination: { totalItems: 1, currentPage: 1, totalPages: 1 }
			}));

			await getProjectsMapController({ i18n: mockI18n, query: {} }, mockRes, mockNext);

			const renderCall = mockRes.render.mock.calls[0][1];
			expect(renderCall).toHaveProperty('filters');
			expect(renderCall).toHaveProperty('activeFilters');
		});
	});

	describe('postProjectsMapController', () => {
		it('should redirect with query parameters', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');
			const { getProjectsMapURL } = require('./utils/get-projects-map-url');

			queryStringBuilder.mockReturnValue('?region=london&sector=energy');
			getProjectsMapURL.mockReturnValue('/projects-map');

			mockRes.redirect = jest.fn();
			const body = { region: 'london', sector: 'energy' };

			await postProjectsMapController({ body }, mockRes);

			expect(mockRes.redirect).toHaveBeenCalledWith('/projects-map?region=london&sector=energy');
		});

		it('should handle POST errors', async () => {
			const { queryStringBuilder } = require('../../utils/query-string-builder');

			queryStringBuilder.mockImplementationOnce(() => {
				throw new Error('Builder error');
			});

			mockRes.status = jest.fn().mockReturnValue({ render: jest.fn() });

			await postProjectsMapController({ body: {} }, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
		});
	});
});
