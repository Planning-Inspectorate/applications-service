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
		describe('successful responses', () => {
			it('should return GeoJSON with valid projects', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [-1.5, 51.5]
							},
							properties: {
								caseRef: 'EN010001',
								projectName: 'Test Project',
								stage: 'Pre-application',
								summary: 'Test summary',
								region: 'London'
							}
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(getProjectsMapGeoJSON).toHaveBeenCalled();
				expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
				expect(mockNext).not.toHaveBeenCalled();
			});

			it('should return empty GeoJSON when no projects exist', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: []
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
				expect(mockNext).not.toHaveBeenCalled();
			});

			it('should return GeoJSON with multiple projects', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
							properties: { caseRef: 'EN010001', projectName: 'Project 1' }
						},
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [-2.5, 52.5] },
							properties: { caseRef: 'EN010002', projectName: 'Project 2' }
						},
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [-3.5, 53.5] },
							properties: { caseRef: 'EN010003', projectName: 'Project 3' }
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
				expect(mockRes.json.mock.calls[0][0].features).toHaveLength(3);
				expect(mockNext).not.toHaveBeenCalled();
			});

			it('should return correct GeoJSON structure', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [0, 50] },
							properties: { caseRef: 'EN010001' }
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				const response = mockRes.json.mock.calls[0][0];
				expect(response.type).toBe('FeatureCollection');
				expect(Array.isArray(response.features)).toBe(true);
				expect(response.features[0].type).toBe('Feature');
				expect(response.features[0].geometry.type).toBe('Point');
				expect(Array.isArray(response.features[0].geometry.coordinates)).toBe(true);
			});
		});

		describe('error handling', () => {
			it('should handle service throwing an error', async () => {
				const testError = new Error('Database connection failed');
				getProjectsMapGeoJSON.mockRejectedValue(testError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockNext).toHaveBeenCalledWith(testError);
				expect(mockRes.json).not.toHaveBeenCalled();
			});

			it('should handle service timeout', async () => {
				const timeoutError = new Error('Request timeout');
				getProjectsMapGeoJSON.mockRejectedValue(timeoutError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockNext).toHaveBeenCalledWith(timeoutError);
			});

			it('should handle API wrapper errors', async () => {
				const apiError = new Error('API authentication failed');
				getProjectsMapGeoJSON.mockRejectedValue(apiError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockNext).toHaveBeenCalledWith(apiError);
			});

			it('should pass error to Express error handler', async () => {
				const customError = new Error('Custom service error');
				customError.statusCode = 500;
				getProjectsMapGeoJSON.mockRejectedValue(customError);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockNext).toHaveBeenCalledWith(customError);
				expect(mockNext.mock.calls[0][0].statusCode).toBe(500);
			});

			it('should not mutate request or response objects on error', async () => {
				const error = new Error('Service error');
				getProjectsMapGeoJSON.mockRejectedValue(error);

				const originalReq = { ...mockReq };
				const originalRes = { ...mockRes };

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockReq).toEqual(originalReq);
				expect(Object.keys(mockRes)).toEqual(Object.keys(originalRes));
			});
		});

		describe('edge cases', () => {
			it('should handle very large project datasets', async () => {
				const largeGeojson = {
					type: 'FeatureCollection',
					features: Array.from({ length: 1000 }, (_, i) => ({
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [i * 0.1, 50 + i * 0.1] },
						properties: {
							caseRef: `EN010${String(i).padStart(4, '0')}`,
							projectName: `Project ${i}`
						}
					}))
				};

				getProjectsMapGeoJSON.mockResolvedValue(largeGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalled();
				expect(mockRes.json.mock.calls[0][0].features).toHaveLength(1000);
				expect(mockNext).not.toHaveBeenCalled();
			});

			it('should handle projects with minimal properties', async () => {
				const minimalGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [0, 50] },
							properties: { caseRef: 'EN010001' }
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(minimalGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(minimalGeojson);
			});

			it('should handle projects with additional custom properties', async () => {
				const extendedGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [0, 50] },
							properties: {
								caseRef: 'EN010001',
								projectName: 'Project',
								stage: 'Pre-application',
								summary: 'Summary',
								region: 'London',
								customField: 'custom value',
								nestedData: { key: 'value' }
							}
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(extendedGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(extendedGeojson);
				expect(mockRes.json.mock.calls[0][0].features[0].properties.customField).toBe(
					'custom value'
				);
			});

			it('should handle different coordinate systems', async () => {
				const geoJsonWithVariousCoords = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [0, 0] },
							properties: { caseRef: 'EN010001' }
						},
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [-180, -90] },
							properties: { caseRef: 'EN010002' }
						},
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [180, 90] },
							properties: { caseRef: 'EN010003' }
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(geoJsonWithVariousCoords);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(geoJsonWithVariousCoords);
			});
		});

		describe('logging', () => {
			it('should log when fetching projects', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 50] }, properties: {} }
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				const logger = require('../../lib/logger');

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(logger.info).toHaveBeenCalledWith('Fetching projects for map API');
			});

			it('should log project count on successful response', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 50] }, properties: {} },
						{ type: 'Feature', geometry: { type: 'Point', coordinates: [1, 51] }, properties: {} }
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				const logger = require('../../lib/logger');

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(logger.info).toHaveBeenCalledWith('Map API returning 2 projects');
			});

			it('should log errors with details', async () => {
				const error = new Error('Test error');
				getProjectsMapGeoJSON.mockRejectedValue(error);

				const logger = require('../../lib/logger');

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(logger.error).toHaveBeenCalledWith(
					'Error fetching projects for map API:',
					expect.objectContaining({
						error: 'Test error'
					})
				);
			});
		});

		describe('response format', () => {
			it('should call res.json exactly once on success', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: []
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledTimes(1);
			});

			it('should not call res.json on error', async () => {
				getProjectsMapGeoJSON.mockRejectedValue(new Error('Error'));

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).not.toHaveBeenCalled();
			});

			it('should return exact GeoJSON without modification', async () => {
				const mockGeojson = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
							properties: { caseRef: 'EN010001', projectName: 'Test' }
						}
					]
				};

				getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

				await getProjectsMap(mockReq, mockRes, mockNext);

				expect(mockRes.json).toHaveBeenCalledWith(mockGeojson);
				expect(mockRes.json.mock.calls[0][0]).toBe(mockGeojson);
			});
		});
	});
});
