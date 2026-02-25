const { getProjectsMapURL } = require('./get-projects-map-url');

describe('pages/projects-map/utils/get-projects-map-url', () => {
	describe('#getProjectsMapURL', () => {
		it('should return the base URL when no query parameters provided', () => {
			const url = getProjectsMapURL();
			expect(url).toEqual('/projects-map');
		});

		it('should return the base URL when empty query object provided', () => {
			const url = getProjectsMapURL({});
			expect(url).toEqual('/projects-map');
		});

		it('should append query parameters to the URL', () => {
			const query = { stage: 'pre-application', region: 'London' };
			const url = getProjectsMapURL(query);
			expect(url).toEqual('/projects-map?stage=pre-application&region=London');
		});

		it('should URL encode special characters in query values', () => {
			const query = { search: 'test project & more' };
			const url = getProjectsMapURL(query);
			expect(url).toContain('test%20project%20%26%20more');
		});

		it('should exclude undefined query parameters', () => {
			const query = { stage: 'pre-application', search: undefined };
			const url = getProjectsMapURL(query);
			expect(url).toEqual('/projects-map?stage=pre-application');
		});

		it('should persist multiple filters when switching views', () => {
			const query = { stage: 'pre-application', region: 'North West', sector: 'Energy' };
			const url = getProjectsMapURL(query);
			expect(url).toContain('stage=pre-application');
			expect(url).toContain('region=North%20West');
			expect(url).toContain('sector=Energy');
		});
	});
});
