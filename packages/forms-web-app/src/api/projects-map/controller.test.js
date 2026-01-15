const { getProjectsMap } = require('./controller');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../services/projects-map.service');
jest.mock('../../lib/logger');

describe('api/projects-map/controller', () => {
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockRes = { json: jest.fn() };
		mockNext = jest.fn();
		jest.clearAllMocks();
	});

	it('should return GeoJSON response on success', async () => {
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

		await getProjectsMap({}, mockRes, mockNext);

		expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
	});

	it('should pass error to error handler on failure', async () => {
		const testError = new Error('Service failed');
		getProjectsMapGeoJSON.mockRejectedValue(testError);

		await getProjectsMap({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(testError);
	});
});
