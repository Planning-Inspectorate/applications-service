const { getProjectsMapQueryString } = require('./get-projects-map-query-string');

describe('projects-map/utils/get-projects-map-query-string', () => {
	describe('#getProjectsMapQueryString', () => {
		describe('When building query string for projects map API', () => {
			describe('and filter parameters are provided', () => {
				it('should build query string with all filter types', () => {
					const result = getProjectsMapQueryString({
						searchTerm: 'test',
						region: 'london',
						sector: 'energy',
						stage: 'examination'
					});

					expect(result).toContain('searchTerm=');
					expect(result).toContain('region=london');
					expect(result).toContain('sector=energy');
					expect(result).toContain('stage=examination');
				});
			});

			describe('and no parameters are provided', () => {
				it('should build query string with empty defaults', () => {
					const result = getProjectsMapQueryString({});

					expect(result).toContain('?');
					expect(result).toContain('searchTerm=');
				});
			});

			describe('and multiple filter values are provided for same type', () => {
				it('should handle array filter values', () => {
					const result = getProjectsMapQueryString({
						region: ['london', 'south_east'],
						sector: ['energy', 'transport']
					});

					expect(result).toContain('region=london');
					expect(result).toContain('region=south_east');
					expect(result).toContain('sector=energy');
					expect(result).toContain('sector=transport');
				});
			});

			describe('and only search term is provided', () => {
				it('should build query string with search term', () => {
					const result = getProjectsMapQueryString({
						searchTerm: 'wind farm'
					});

					expect(result).toContain('searchTerm=wind');
					expect(result).toContain('?');
				});
			});

			describe('and null/undefined values are in query params', () => {
				it('should treat null/undefined as empty array for filters', () => {
					const result = getProjectsMapQueryString({
						region: null,
						sector: undefined,
						stage: 'examination'
					});

					expect(result).toContain('stage=examination');
				});
			});
		});
	});
});
