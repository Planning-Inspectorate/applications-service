const {
	projectsIndexRoute,
	projectsIndexI18nNamespace,
	geoJsonMimeType,
	projectBoundaryDownloadRoute
} = require('./config');

describe('pages/projects/index/config', () => {
	describe('#projectsIndexRoute', () => {
		it('should return the projects index route', () => {
			expect(projectsIndexRoute).toEqual('');
		});
	});

	describe('#projectsIBoundaryDownloadRoute', () => {
		it('should return the projects index route', () => {
			expect(projectBoundaryDownloadRoute).toEqual('download-boundary');
		});
	});

	describe('#projectsIndexI18nNamespace', () => {
		it('should return the i18n namespace', () => {
			expect(projectsIndexI18nNamespace).toEqual('projectsIndex');
		});
	});

	describe('#geoJsonMimeType', () => {
		it('should return the GeoJSON MIME type', () => {
			expect(geoJsonMimeType).toEqual('application/geo+json');
		});
	});
});
