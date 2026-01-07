const { getProjectsMapController } = require('./controller');
const { getApplications } = require('../../services/applications.service');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../lib/logger');
jest.mock('../../services/applications.service');
jest.mock('../../services/projects-map.service');
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

	it('should render view with project data', async () => {
		getApplications.mockResolvedValue({
			applications: [
				{
					CaseReference: 'EN010001',
					ProjectName: 'Test Project',
					LongLat: [-1.5, 51.5],
					Stage: 'pre-application'
				}
			],
			filters: [
				{
					name: 'region',
					count: 1,
					label: 'North West',
					label_cy: 'Gogledd Orllewin',
					value: 'north_west'
				}
			],
			pagination: { totalItems: 1, totalItemsWithoutFilters: 10 }
		});

		transformProjectsToGeoJSON.mockReturnValue({
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
					properties: { caseRef: 'EN010001', projectName: 'Test Project' }
				}
			]
		});

		const mockReq = { query: {}, i18n: { t: jest.fn((key) => key), language: 'en' } };
		await getProjectsMapController(mockReq, mockRes, mockNext);

		expect(getApplications).toHaveBeenCalled();
		expect(transformProjectsToGeoJSON).toHaveBeenCalledWith([
			expect.objectContaining({ CaseReference: 'EN010001' })
		]);
		expect(mockRes.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				mapConfig: expect.objectContaining({
					markers: expect.any(Array),
					totalProjects: 1
				}),
				projectSearchURL: '/projects/search'
			})
		);
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should handle different API response structures', async () => {
		getApplications.mockResolvedValue({
			applications: [{ CaseReference: 'EN010002', ProjectName: 'Test 2', LongLat: [-2.0, 52.0] }],
			filters: [],
			pagination: { totalItems: 1, totalItemsWithoutFilters: 10 }
		});
		transformProjectsToGeoJSON.mockReturnValue({ type: 'FeatureCollection', features: [] });

		const mockReq = { query: {}, i18n: { t: jest.fn((key) => key), language: 'en' } };
		await getProjectsMapController(mockReq, mockRes, mockNext);

		expect(transformProjectsToGeoJSON).toHaveBeenCalledWith([
			expect.objectContaining({ CaseReference: 'EN010002' })
		]);
	});

	test.each([
		[null, 'null response'],
		[{ applications: null }, 'null applications'],
		[{}, 'missing applications property']
	])('should handle API failures: %s', async (apiResponse) => {
		getApplications.mockResolvedValue(apiResponse);

		const mockReq = { query: {}, i18n: { t: jest.fn((key) => key), language: 'en' } };
		await getProjectsMapController(mockReq, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(
			expect.objectContaining({ message: 'Failed to fetch projects from database' })
		);
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle transformation errors', async () => {
		getApplications.mockResolvedValue({
			applications: [],
			filters: [],
			pagination: { totalItems: 0, totalItemsWithoutFilters: 10 }
		});
		transformProjectsToGeoJSON.mockImplementation(() => {
			throw new Error('Transform failed');
		});

		const mockReq = { query: {}, i18n: { t: jest.fn((key) => key), language: 'en' } };
		await getProjectsMapController(mockReq, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});
});
