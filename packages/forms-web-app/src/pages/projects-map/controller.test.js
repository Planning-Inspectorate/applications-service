const { getProjectsMapController } = require('./controller');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../config', () => ({
	logger: {
		level: 'info',
		redact: []
	},
	maps: {
		leafletOptions: {
			minZoom: 7,
			maxZoom: 20,
			center: [51.8086, -1.7139],
			zoom: 7,
			attributionControl: true
		},
		restrictToUk: {
			enabled: false
		},
		tileLayer: {
			url: 'https://api.os.uk/maps/raster/v1/zxy/Light_3857/{z}/{x}/{y}.png',
			tokenEndpoint: '/api/os-maps/token',
			maxZoom: 20,
			attribution: '© Crown Copyright'
		},
		display: {
			clustered: true,
			elementId: 'map'
		}
	}
}));
jest.mock('../../lib/logger');
jest.mock('../project-search/utils/get-project-search-url', () => ({
	getProjectSearchURL: jest.fn(() => '/projects/search')
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

			getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

			await getProjectsMapController({}, mockRes, mockNext);

			expect(getProjectsMapGeoJSON).toHaveBeenCalled();
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

			getProjectsMapGeoJSON.mockResolvedValue(emptyGeojson);

			await getProjectsMapController({}, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalled();
			expect(mockNext).not.toHaveBeenCalled();
		});
	});

	describe('error handling', () => {
		it('should pass error to Express error handler when service fails', async () => {
			const testError = new Error('Service failed');
			getProjectsMapGeoJSON.mockRejectedValue(testError);

			await getProjectsMapController({}, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(testError);
			expect(mockRes.render).not.toHaveBeenCalled();
		});

		it('should not render view on error', async () => {
			getProjectsMapGeoJSON.mockRejectedValue(new Error('Database error'));

			await getProjectsMapController({}, mockRes, mockNext);

			expect(mockRes.render).not.toHaveBeenCalled();
		});
	});
});
