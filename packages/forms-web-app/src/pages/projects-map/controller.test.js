const { getProjectsMapController } = require('./controller');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

jest.mock('../../lib/logger');
jest.mock('../../lib/application-api-wrapper');
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
		getAllProjectList.mockResolvedValue({
			data: {
				applications: [
					{
						CaseReference: 'EN010001',
						ProjectName: 'Test Project',
						LongLat: [-1.5, 51.5],
						Stage: 'pre-application'
					}
				]
			}
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

		await getProjectsMapController({}, mockRes, mockNext);

		expect(getAllProjectList).toHaveBeenCalled();
		expect(transformProjectsToGeoJSON).toHaveBeenCalledWith([
			expect.objectContaining({ CaseReference: 'EN010001' })
		]);

		expect(mockRes.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				mapConfig: expect.objectContaining({
					elementId: 'map',
					mapOptions: expect.objectContaining({
						minZoom: 7,
						maxZoom: 20,
						center: [51.8086, -1.7139],
						zoom: 7,
						attributionControl: true
					}),
					tileLayer: expect.objectContaining({
						url: 'https://api.os.uk/maps/raster/v1/zxy/Light_3857/{z}/{x}/{y}.png',
						tokenEndpoint: '/api/os-maps/token'
					}),
					markers: expect.any(Array),
					clustered: true,
					totalProjects: 1
				}),
				projectSearchURL: '/projects/search'
			})
		);
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should handle different API response structures', async () => {
		// Test flat data structure
		getAllProjectList.mockResolvedValue({
			data: [{ CaseReference: 'EN010002', ProjectName: 'Test 2', LongLat: [-2.0, 52.0] }]
		});
		transformProjectsToGeoJSON.mockReturnValue({ type: 'FeatureCollection', features: [] });

		await getProjectsMapController({}, mockRes, mockNext);

		expect(transformProjectsToGeoJSON).toHaveBeenCalledWith([
			expect.objectContaining({ CaseReference: 'EN010002' })
		]);
	});

	test.each([
		[null, 'null response'],
		[{ data: null }, 'null data'],
		[{}, 'missing data property']
	])('should handle API failures: %s', async (apiResponse) => {
		getAllProjectList.mockResolvedValue(apiResponse);

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(
			expect.objectContaining({ message: 'Failed to fetch projects from database' })
		);
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle transformation errors', async () => {
		getAllProjectList.mockResolvedValue({ data: { applications: [] } });
		transformProjectsToGeoJSON.mockImplementation(() => {
			throw new Error('Transform failed');
		});

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle empty projects array', async () => {
		getAllProjectList.mockResolvedValue({
			data: { applications: [] }
		});
		transformProjectsToGeoJSON.mockReturnValue({
			type: 'FeatureCollection',
			features: []
		});

		await getProjectsMapController({}, mockRes, mockNext);

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

	it('should handle API request rejection', async () => {
		getAllProjectList.mockRejectedValueOnce(new Error('API connection failed'));

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should pass correct application data to GeoJSON transformer', async () => {
		const applicationData = [
			{ CaseReference: 'EN010001', ProjectName: 'Project 1', LongLat: [0, 50] },
			{ CaseReference: 'EN010002', ProjectName: 'Project 2', LongLat: [1, 51] }
		];

		getAllProjectList.mockResolvedValue({
			data: { applications: applicationData }
		});
		transformProjectsToGeoJSON.mockReturnValue({
			type: 'FeatureCollection',
			features: []
		});

		await getProjectsMapController({}, mockRes, mockNext);

		expect(transformProjectsToGeoJSON).toHaveBeenCalledWith(applicationData);
	});
});
