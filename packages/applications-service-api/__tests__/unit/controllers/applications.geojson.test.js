const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getApplicationsGeoJSON } = require('../../../src/controllers/applications.geojson');
const { getAllApplications } = require('../../../src/services/application.backoffice.service');

jest.mock('../../../src/services/application.backoffice.service', () => ({
	getAllApplications: jest.fn(),
	createQueryFilters: jest.fn()
}));

const mockApplication = (overrides = {}) => ({
	caseReference: 'EN010001',
	projectName: 'Test Project',
	stage: 'pre_application',
	longLat: ['-1.5', '51.5'],
	...overrides
});

describe('controllers/applications.geojson', () => {
	afterEach(() => jest.resetAllMocks());

	describe('getApplicationsGeoJSON', () => {
		it('returns a GeoJSON FeatureCollection with valid projects', async () => {
			getAllApplications.mockResolvedValue({
				applications: [mockApplication()]
			});

			const req = httpMocks.createRequest({ query: {} });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getJSONData()).toEqual({
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-1.5, 51.5] },
						properties: {
							caseReference: 'EN010001',
							projectName: 'Test Project',
							stage: 'pre_application',
							projectURL: '/projects/EN010001'
						}
					}
				]
			});
		});

		it('excludes projects with missing longLat', async () => {
			getAllApplications.mockResolvedValue({
				applications: [mockApplication({ longLat: null })]
			});

			const req = httpMocks.createRequest({ query: {} });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(res._getJSONData().features).toHaveLength(0);
		});

		it('excludes projects with empty longLat array', async () => {
			getAllApplications.mockResolvedValue({
				applications: [mockApplication({ longLat: [] })]
			});

			const req = httpMocks.createRequest({ query: {} });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(res._getJSONData().features).toHaveLength(0);
		});

		it('excludes projects with non-numeric coordinates', async () => {
			getAllApplications.mockResolvedValue({
				applications: [mockApplication({ longLat: ['invalid', 'coords'] })]
			});

			const req = httpMocks.createRequest({ query: {} });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(res._getJSONData().features).toHaveLength(0);
		});

		it('passes query params to getAllApplications', async () => {
			getAllApplications.mockResolvedValue({ applications: [] });

			const req = httpMocks.createRequest({ query: { region: 'wales', sector: 'energy' } });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(getAllApplications).toHaveBeenCalledWith({ region: 'wales', sector: 'energy' });
		});

		it('returns empty FeatureCollection when no applications exist', async () => {
			getAllApplications.mockResolvedValue({ applications: [] });

			const req = httpMocks.createRequest({ query: {} });
			const res = httpMocks.createResponse();

			await getApplicationsGeoJSON(req, res);

			expect(res._getJSONData()).toEqual({ type: 'FeatureCollection', features: [] });
		});
	});
});
