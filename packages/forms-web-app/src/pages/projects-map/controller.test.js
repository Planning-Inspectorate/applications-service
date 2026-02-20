const { getProjectsMapController, postProjectsMapController } = require('./controller');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { getApplications } = require('../../services/applications.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../services/applications.service');
jest.mock('../../config', () => ({
	logger: {
		level: 'info',
		redact: []
	},
	maps: {
		osMapsApiKey: 'test-key',
		osMapsApiSecret: 'test-secret',
		crs: {
			code: 'EPSG:27700',
			proj4String:
				'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
			extent: [-238375.0, -100000.0, 900000.0, 1376256.0]
		},
		display: {
			elementId: 'projects-map',
			center: [-2, 55],
			zoom: 0
		}
	}
}));
jest.mock('../../lib/logger');
jest.mock('../project-search/utils/get-project-search-url', () => ({
	getProjectSearchURL: jest.fn(() => '/projects/search')
}));
jest.mock('../projects-map/utils/get-projects-map-url', () => ({
	getProjectsMapURL: jest.fn(() => '/projects-map')
}));
jest.mock('../projects-map/utils/get-projects-map-query-string', () => ({
	getProjectsMapQueryString: jest.fn(() => '')
}));
jest.mock('../projects-map/utils/get-page-data', () => ({
	getPageData: jest.fn(() => ({
		filters: [],
		activeFilters: [],
		query: {},
		mapConfig: { markers: [] },
		projectSearchURL: '/project-search'
	}))
}));

describe('pages/projects-map/controller', () => {
	let mockRes;
	let mockNext;
	let mockReq;

	beforeEach(() => {
		mockRes = { render: jest.fn() };
		mockNext = jest.fn();
		mockReq = {
			i18n: { language: 'en' },
			query: {}
		};
		jest.clearAllMocks();
	});

	describe('success', () => {
		it('should render view with map configuration', async () => {
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
				filters: [],
				pagination: { totalItems: 1 }
			});
			getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(getProjectsMapGeoJSON).toHaveBeenCalled();
			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					mapConfig: expect.any(Object)
				})
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it('should include totalProjects in mapConfig when filters are active', async () => {
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

			mockReq.query = { stage: 'pre-application' };

			getApplications.mockResolvedValue({
				filters: [],
				pagination: { totalItems: 1 }
			});
			getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			const renderCall = mockRes.render.mock.calls[0];
			const renderedData = renderCall[1];

			expect(renderedData.mapConfig).toEqual(
				expect.objectContaining({
					totalProjects: 1,
					markers: expect.any(Array),
					crs: expect.any(Object),
					elementId: 'projects-map'
				})
			);
		});

		it('should render map config without filters', async () => {
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

			mockReq.query = {};

			getApplications.mockResolvedValue({
				filters: [],
				pagination: { totalItems: 1 }
			});
			getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			const renderCall = mockRes.render.mock.calls[0];
			const renderedData = renderCall[1];

			expect(renderedData.mapConfig).toEqual(
				expect.objectContaining({
					totalProjects: 1,
					markers: expect.any(Array),
					crs: expect.any(Object),
					elementId: 'projects-map'
				})
			);
		});

		it('should exclude language parameter from active filters', async () => {
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

			mockReq.query = { lang: 'cy' };

			getApplications.mockResolvedValue({
				filters: [],
				pagination: { totalItems: 1 }
			});
			getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			const renderCall = mockRes.render.mock.calls[0];
			const renderedData = renderCall[1];

			expect(renderedData.mapConfig).toEqual(
				expect.objectContaining({
					totalProjects: 1,
					crs: expect.any(Object),
					elementId: 'projects-map'
				})
			);
		});

		it('should render view with empty markers when no projects exist', async () => {
			const emptyGeojson = {
				type: 'FeatureCollection',
				features: []
			};

			getApplications.mockResolvedValue({
				filters: [],
				pagination: { totalItems: 0 }
			});
			getProjectsMapGeoJSON.mockResolvedValue(emptyGeojson);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalled();
			expect(mockNext).not.toHaveBeenCalled();
		});
	});

	describe('error handling', () => {
		it('should pass error to Express error handler when service fails', async () => {
			const testError = new Error('Service failed');
			getApplications.mockRejectedValue(testError);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(testError);
			expect(mockRes.render).not.toHaveBeenCalled();
		});

		it('should not render view on error', async () => {
			getApplications.mockRejectedValue(new Error('Database error'));

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockRes.render).not.toHaveBeenCalled();
		});
	});
});

describe('pages/projects-map/controller#postProjectsMapController', () => {
	describe('When submitting filters on projects map page', () => {
		const req = {
			body: { stage: 'pre_application', region: 'north_west' }
		};
		const res = {
			redirect: jest.fn()
		};

		beforeEach(async () => {
			await postProjectsMapController(req, res);
		});

		it('should trigger a redirect', () => {
			expect(res.redirect).toHaveBeenCalledTimes(1);
		});

		it('should redirect to projects-map with correctly constructed query string from the request body', () => {
			expect(res.redirect).toHaveBeenCalledWith(
				'/projects-map?stage=pre_application&region=north_west'
			);
		});

		it('should URL encode special characters in filter values', async () => {
			const reqWithSpecialChars = {
				body: { search: 'Thames Crossing & Related' }
			};
			const resWithSpecialChars = { redirect: jest.fn() };

			await postProjectsMapController(reqWithSpecialChars, resWithSpecialChars);

			expect(resWithSpecialChars.redirect).toHaveBeenCalledWith(
				expect.stringContaining('Thames%20Crossing%20%26%20Related')
			);
		});

		it('should persist multiple filter values when submitted', async () => {
			const reqWithMultipleFilters = {
				body: { stage: 'pre_application', region: 'london', sector: 'energy' }
			};
			const resWithMultipleFilters = { redirect: jest.fn() };

			await postProjectsMapController(reqWithMultipleFilters, resWithMultipleFilters);

			const redirectUrl = resWithMultipleFilters.redirect.mock.calls[0][0];
			expect(redirectUrl).toContain('stage=pre_application');
			expect(redirectUrl).toContain('region=london');
			expect(redirectUrl).toContain('sector=energy');
		});
	});
});
