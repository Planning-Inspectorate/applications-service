jest.mock('../../lib/logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn()
}));

jest.mock('../../lib/application-api-wrapper', () => ({
	getAllProjectList: jest.fn()
}));

const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getGeoJsonController } = require('./controller');

describe('api/geojson/controller', () => {
	let mockReq;
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			setHeader: jest.fn()
		};
		mockNext = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('#getGeoJsonController', () => {
		it('should return GeoJSON from database projects', async () => {
			const mockProjects = [
				{
					CaseReference: 'EN010001',
					ProjectName: 'Test Project',
					LongLat: ['-1.5', '51.5'],
					Stage: 4,
					Proposal: 'EN01',
					Region: 'South West',
					DateOfDCOSubmission: '2023-01-01',
					DateOfDCOAcceptance_NonAcceptance: '2023-02-01'
				}
			];

			getAllProjectList.mockResolvedValue({
				data: {
					applications: mockProjects
				}
			});

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(getAllProjectList).toHaveBeenCalled();
			expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
			expect(mockRes.setHeader).toHaveBeenCalledWith('Cache-Control', 'public, max-age=300');
			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'FeatureCollection',
					features: expect.arrayContaining([
						expect.objectContaining({
							type: 'Feature',
							geometry: expect.objectContaining({
								type: 'Point',
								coordinates: [-1.5, 51.5]
							}),
							properties: expect.objectContaining({
								caseRef: 'EN010001',
								projectName: 'Test Project',
								stage: 'Examination'
							})
						})
					])
				})
			);
		});

		it('should use default coordinates when LongLat is missing', async () => {
			const mockProjects = [
				{
					CaseReference: 'EN010002',
					ProjectName: 'No Location Project',
					Stage: 1
				}
			];

			getAllProjectList.mockResolvedValue({
				data: {
					applications: mockProjects
				}
			});

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(mockRes.json).toHaveBeenCalledWith(
				expect.objectContaining({
					features: expect.arrayContaining([
						expect.objectContaining({
							geometry: expect.objectContaining({
								coordinates: [-1.7, 52.3]
							})
						})
					])
				})
			);
		});

		it('should call next with error when database fetch fails', async () => {
			getAllProjectList.mockResolvedValue(null);

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});

		it('should call next with error when getAllProjectList throws', async () => {
			getAllProjectList.mockRejectedValue(new Error('Database error'));

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
