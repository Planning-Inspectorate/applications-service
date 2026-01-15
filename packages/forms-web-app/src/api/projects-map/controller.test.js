const { getProjectsMap } = require('./controller');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../lib/logger');

describe('api/projects-map/controller', () => {
	let mockReq;
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockReq = {};
		mockRes = { json: jest.fn() };
		mockNext = jest.fn();
		jest.clearAllMocks();
	});

	describe('getProjectsMap', () => {
		describe('success', () => {
			it('should call service and return GeoJSON response', async () => {
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

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(getProjectsMapGeoJSON).toHaveBeenCalled();
				expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
				expect(mockNext).not.toHaveBeenCalled();
			});

			it('should return empty feature collection when no projects exist', async () => {
				const emptyGeojson = {
					type: 'FeatureCollection',
					features: []
				};

				getProjectsMapGeoJSON.mockResolvedValue(emptyGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(emptyGeojson);
			});
		});

		describe('error handling', () => {
			it('should pass error to Express error handler', async () => {
				const testError = new Error('Database connection failed');
				getProjectsMapGeoJSON.mockRejectedValue(testError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockNext).toHaveBeenCalledWith(testError);
				expect(mockRes.json).not.toHaveBeenCalled();
			});

			it('should not call res.json on error', async () => {
				const testError = new Error('Service failed');
				getProjectsMapGeoJSON.mockRejectedValue(testError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).not.toHaveBeenCalled();
				expect(mockNext).toHaveBeenCalled();
			});
		});
	});
});
