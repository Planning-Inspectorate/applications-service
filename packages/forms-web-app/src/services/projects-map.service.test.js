const { getProjectsMapGeoJSON } = require('./projects-map.service');
const {
	getProjectsMapGeoJSON: getProjectsMapGeoJSONFromAPI
} = require('../lib/application-api-wrapper');

jest.mock('../lib/application-api-wrapper', () => ({
	getProjectsMapGeoJSON: jest.fn()
}));

const mockGeoJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
			properties: { caseReference: 'EN010001', projectName: 'Test', stage: 'pre_application' }
		}
	]
};

describe('services/projects-map.service', () => {
	afterEach(() => jest.resetAllMocks());

	it('returns GeoJSON data on success', async () => {
		getProjectsMapGeoJSONFromAPI.mockResolvedValue({ resp_code: 200, data: mockGeoJSON });

		const result = await getProjectsMapGeoJSON({});

		expect(result).toEqual(mockGeoJSON);
	});

	it('passes filter query params to the API', async () => {
		getProjectsMapGeoJSONFromAPI.mockResolvedValue({ resp_code: 200, data: mockGeoJSON });

		await getProjectsMapGeoJSON({ region: 'wales', sector: 'energy' });

		expect(getProjectsMapGeoJSONFromAPI).toHaveBeenCalledWith('?region=wales&sector=energy');
	});

	it('throws when API returns non-200', async () => {
		getProjectsMapGeoJSONFromAPI.mockResolvedValue({ resp_code: 500 });

		await expect(getProjectsMapGeoJSON({})).rejects.toThrow(
			'Projects map GeoJSON response status not 200'
		);
	});
});
