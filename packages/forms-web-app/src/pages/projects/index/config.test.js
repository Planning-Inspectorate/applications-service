const { projectsIndexRoute, projectsIndexI18nNamespace, geoJsonMimeType } = require('./config');

describe('pages/projects/index/config', () => {
	describe('#projectsIndexRoute', () => {
		it('should return the projects index route', () => {
			expect(projectsIndexRoute).toEqual('');
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
