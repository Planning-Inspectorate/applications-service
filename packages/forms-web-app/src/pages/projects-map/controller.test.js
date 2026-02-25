const { getProjectsMapController, postProjectsMapController } = require('./controller');
const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { maps: mapConfig } = require('../../config');
const { getMapAccessToken } = require('../_services');
const { getPageData } = require('./utils/get-page-data');
const { getProjectsMapQueryString } = require('./utils/get-projects-map-query-string');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');

jest.mock('../../lib/logger');
jest.mock('../../services/applications.service');
jest.mock('../../utils/query-string-builder');
jest.mock('../../services/projects-map.service');
jest.mock('../../config');
jest.mock('../_services');
jest.mock('./utils/get-page-data');
jest.mock('./utils/get-projects-map-query-string');
jest.mock('./utils/get-projects-map-url');

describe('Projects Map Controller', () => {
	let req, res, next;

	beforeEach(() => {
		jest.clearAllMocks();

		req = {
			i18n: { language: 'en' },
			query: { stage: 'examination' },
			body: { stage: 'examination', region: 'north' }
		};

		res = {
			render: jest.fn(),
			redirect: jest.fn(),
			status: jest.fn().mockReturnThis()
		};

		next = jest.fn();

		// Mock config
		mapConfig.display = {
			elementId: 'map-container',
			center: [400000, 200000],
			zoom: 5
		};
		mapConfig.crs = {
			code: 'EPSG:27700',
			proj4String: '+proj=tmerc...',
			extent: [0, 0, 700000, 1300000]
		};
	});

	describe('getProjectsMapController', () => {
		it('should render projects map with filters and GeoJSON data', async () => {
			const mockFilters = { stage: ['examination', 'pre-examination'] };
			const mockFeatures = [
				{ properties: { projectName: 'Project A', caseRef: 'EN010001', stage: 'examination' } }
			];
			const mockPageData = { pageTitle: 'Projects Map', filters: mockFilters };

			getProjectsMapQueryString.mockReturnValue('?stage=examination');
			getApplications.mockResolvedValue({ filters: mockFilters });
			getProjectsMapGeoJSON.mockResolvedValue({ features: mockFeatures });
			getPageData.mockReturnValue(mockPageData);
			getMapAccessToken.mockResolvedValue('mock-access-token');

			await getProjectsMapController(req, res, next);

			expect(getProjectsMapQueryString).toHaveBeenCalledWith(req.query);
			expect(getApplications).toHaveBeenCalledWith('?stage=examination');
			expect(getProjectsMapGeoJSON).toHaveBeenCalledWith('?stage=examination');
			expect(getPageData).toHaveBeenCalledWith(req.i18n, req.query, mockFeatures, mockFilters);
			expect(getMapAccessToken).toHaveBeenCalled();
			expect(res.render).toHaveBeenCalledWith('projects-map/view.njk', {
				...mockPageData,
				mapConfig: {
					elementId: 'map-container',
					accessToken: 'mock-access-token',
					center: [400000, 200000],
					zoom: 5,
					markers: mockFeatures,
					totalProjects: 1,
					crs: mapConfig.crs
				}
			});
		});

		it('should handle empty GeoJSON features', async () => {
			const mockFilters = { stage: ['examination'] };
			const mockPageData = { pageTitle: 'Projects Map' };

			getProjectsMapQueryString.mockReturnValue('');
			getApplications.mockResolvedValue({ filters: mockFilters });
			getProjectsMapGeoJSON.mockResolvedValue({ features: [] });
			getPageData.mockReturnValue(mockPageData);
			getMapAccessToken.mockResolvedValue('token');

			await getProjectsMapController(req, res, next);

			expect(res.render).toHaveBeenCalled();
			const call = res.render.mock.calls[0][1];
			expect(call.mapConfig.markers).toEqual([]);
			expect(call.mapConfig.totalProjects).toBe(0);
		});

		it('should throw error when mapConfig.display is missing', async () => {
			mapConfig.display = null;

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(next.mock.calls[0][0].message).toContain(
				'Missing required map configuration: display.elementId'
			);
		});

		it('should throw error when mapConfig.display.elementId is missing', async () => {
			mapConfig.display = { center: [0, 0] };

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(next.mock.calls[0][0].message).toContain(
				'Missing required map configuration: display.elementId'
			);
		});

		it('should throw error when mapConfig.crs is missing', async () => {
			mapConfig.crs = null;

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(next.mock.calls[0][0].message).toContain('Missing required map configuration: crs');
		});

		it('should handle API errors gracefully', async () => {
			getProjectsMapQueryString.mockReturnValue('');
			getApplications.mockRejectedValue(new Error('API Error'));

			await getProjectsMapController(req, res, next);

			expect(logger.error).toHaveBeenCalledWith(
				'Error in getProjectsMapController:',
				expect.any(Error)
			);
			expect(next).toHaveBeenCalledWith(expect.any(Error));
		});

		it('should handle token fetch errors', async () => {
			const mockFilters = { stage: [] };
			const mockFeatures = [];

			getProjectsMapQueryString.mockReturnValue('');
			getApplications.mockResolvedValue({ filters: mockFilters });
			getProjectsMapGeoJSON.mockResolvedValue({ features: mockFeatures });
			getPageData.mockReturnValue({});
			getMapAccessToken.mockRejectedValue(new Error('Token Error'));

			await getProjectsMapController(req, res, next);

			expect(logger.error).toHaveBeenCalledWith(
				'Error in getProjectsMapController:',
				expect.any(Error)
			);
			expect(next).toHaveBeenCalledWith(expect.any(Error));
		});
	});

	describe('postProjectsMapController', () => {
		it('should redirect with query string from form body', async () => {
			getProjectsMapURL.mockReturnValue('/projects-map');
			queryStringBuilder.mockReturnValue('?stage=examination&region=north');

			await postProjectsMapController(req, res);

			expect(queryStringBuilder).toHaveBeenCalledWith(req.body, ['stage', 'region']);
			expect(getProjectsMapURL).toHaveBeenCalled();
			expect(res.redirect).toHaveBeenCalledWith('/projects-map?stage=examination&region=north');
		});

		it('should redirect with empty query string for empty body', async () => {
			req.body = {};
			getProjectsMapURL.mockReturnValue('/projects-map');
			queryStringBuilder.mockReturnValue('');

			await postProjectsMapController(req, res);

			expect(queryStringBuilder).toHaveBeenCalledWith({}, []);
			expect(res.redirect).toHaveBeenCalledWith('/projects-map');
		});

		it('should handle errors and render error page', async () => {
			queryStringBuilder.mockImplementation(() => {
				throw new Error('Builder Error');
			});

			await postProjectsMapController(req, res);

			expect(logger.error).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
		});

		it('should handle URL builder errors', async () => {
			queryStringBuilder.mockReturnValue('?stage=exam');
			getProjectsMapURL.mockImplementation(() => {
				throw new Error('URL Error');
			});

			await postProjectsMapController(req, res);

			expect(logger.error).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
		});

		it('should preserve all query parameters from body', async () => {
			req.body = { stage: 'exam', region: 'north', status: 'open' };
			getProjectsMapURL.mockReturnValue('/projects-map');
			queryStringBuilder.mockReturnValue('?stage=exam&region=north&status=open');

			await postProjectsMapController(req, res);

			expect(queryStringBuilder).toHaveBeenCalledWith(
				{ stage: 'exam', region: 'north', status: 'open' },
				['stage', 'region', 'status']
			);
		});
	});
});
