const {
	projectsMapRoute,
	masterGeoJsonDownloadRoute,
	masterGeoJsonMapDisplayRoute
} = require('./config');

describe('pages/projects-map/config', () => {
	describe('#projectsMapRoute', () => {
		it('should return the projects map route', () => {
			expect(projectsMapRoute).toEqual('projects-map');
		});
	});
	describe('#projectsMapGeoJsonDownloadRoute', () => {
		it('should return the projects map master geo json download route', () => {
			expect(masterGeoJsonDownloadRoute).toEqual('download-boundaries');
		});
	});
	describe('#projectsMapGeoJsonMapDisplayRoute', () => {
		it('should return the master geo json map display route', () => {
			expect(masterGeoJsonMapDisplayRoute).toEqual('geojson');
		});
	});
});
