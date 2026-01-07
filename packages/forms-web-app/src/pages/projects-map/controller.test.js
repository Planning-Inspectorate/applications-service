const { getProjectsMapController } = require('./controller');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');

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
		const mockGeojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
					properties: { caseRef: 'EN010001', projectName: 'Test Project', stage: 'pre-application' }
				}
			]
		};

		getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

		await getProjectsMapController({}, mockRes, mockNext);

		expect(getProjectsMapGeoJSON).toHaveBeenCalled();

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

	it('should handle null GeoJSON response', async () => {
		getProjectsMapGeoJSON.mockResolvedValue(null);

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle invalid GeoJSON type', async () => {
		getProjectsMapGeoJSON.mockResolvedValue({
			type: 'InvalidType',
			features: []
		});

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle GeoJSON with invalid features', async () => {
		getProjectsMapGeoJSON.mockResolvedValue({
			type: 'FeatureCollection',
			features: 'not-an-array'
		});

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle service errors', async () => {
		getProjectsMapGeoJSON.mockRejectedValueOnce(new Error('Service failed'));

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		expect(mockRes.render).not.toHaveBeenCalled();
	});

	it('should handle empty projects array', async () => {
		getProjectsMapGeoJSON.mockResolvedValue({
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

	it('should pass correct map config from configuration file', async () => {
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

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockRes.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				mapConfig: expect.objectContaining({
					mapOptions: expect.objectContaining({
						minZoom: 7,
						maxZoom: 20,
						center: [51.8086, -1.7139],
						zoom: 7,
						attributionControl: true
					}),
					tileLayer: expect.objectContaining({
						url: expect.stringContaining('api.os.uk'),
						tokenEndpoint: '/api/os-maps/token',
						options: expect.objectContaining({
							maxZoom: 20,
							attribution: expect.stringContaining('Crown Copyright')
						})
					}),
					clustered: true
				})
			})
		);
	});

	it('should handle multiple projects', async () => {
		const mockGeojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [0, 50] },
					properties: { caseRef: 'EN010001' }
				},
				{
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [1, 51] },
					properties: { caseRef: 'EN010002' }
				},
				{
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [2, 52] },
					properties: { caseRef: 'EN010003' }
				}
			]
		};

		getProjectsMapGeoJSON.mockResolvedValue(mockGeojson);

		await getProjectsMapController({}, mockRes, mockNext);

		expect(mockRes.render).toHaveBeenCalledWith(
			'projects-map/view.njk',
			expect.objectContaining({
				mapConfig: expect.objectContaining({
					totalProjects: 3,
					markers: expect.arrayContaining([
						expect.objectContaining({
							properties: expect.objectContaining({ caseRef: 'EN010001' })
						}),
						expect.objectContaining({
							properties: expect.objectContaining({ caseRef: 'EN010002' })
						}),
						expect.objectContaining({
							properties: expect.objectContaining({ caseRef: 'EN010003' })
						})
					])
				})
			})
		);
		expect(mockNext).not.toHaveBeenCalled();
	});
});
