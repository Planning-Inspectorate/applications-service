const { getGeoJsonURL } = require('./get-master-geo-json-url');

describe('pages/projects-map/utils/get-geo-json-url', () => {
	describe('#getGeoJsonURL', () => {
		describe('When getting the GeoJSON URL', () => {
			const geoJsonURL = getGeoJsonURL();

			it('should return the GeoJSON URL with the route parameters', () => {
				expect(geoJsonURL).toEqual('/projects-map/geojson');
			});
		});
	});
});
