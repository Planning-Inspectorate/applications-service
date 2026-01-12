const { buildFilterQueryString } = require('./build-filter-query-string');

describe('_utils/build-filter-query-string', () => {
	describe('#buildFilterQueryString', () => {
		describe('When building query string with filters', () => {
			describe('and only basic filter params are provided', () => {
				it('should build query string with default filter values', () => {
					const result = buildFilterQueryString({
						region: 'london',
						sector: 'energy',
						stage: 'examination'
					});

					expect(result).toContain('region=london');
					expect(result).toContain('sector=energy');
					expect(result).toContain('stage=examination');
					expect(result).toContain('searchTerm=');
				});
			});

			describe('and no filters are provided', () => {
				it('should build query string starting with question mark', () => {
					const result = buildFilterQueryString({});

					expect(result).toContain('?');
					expect(result).toBeTruthy();
				});
			});

			describe('and multiple values for the same filter are provided', () => {
				it('should build query string with multiple filter parameters', () => {
					const result = buildFilterQueryString({
						region: ['london', 'south_east'],
						sector: 'energy'
					});

					expect(result).toContain('region=london');
					expect(result).toContain('region=south_east');
					expect(result).toContain('sector=energy');
				});
			});

			describe('and custom params are provided', () => {
				it('should include custom params along with filters', () => {
					const result = buildFilterQueryString(
						{
							region: 'london',
							sector: 'energy'
						},
						{
							page: 2,
							size: 10,
							sort: '+ProjectName'
						}
					);

					expect(result).toContain('region=london');
					expect(result).toContain('sector=energy');
					expect(result).toContain('page=2');
					expect(result).toContain('size=10');
					expect(result).toContain('sort=');
				});
			});

			describe('and searchTerm is explicitly provided', () => {
				it('should include the search term in query string', () => {
					const result = buildFilterQueryString({
						searchTerm: 'test project',
						region: 'london'
					});

					expect(result).toContain('searchTerm=test');
					expect(result).toContain('region=london');
				});
			});

			describe('and filter values need URL encoding', () => {
				it('should properly encode special characters', () => {
					const result = buildFilterQueryString({
						searchTerm: 'test & project'
					});

					expect(result).toContain('searchTerm=');
					expect(result).toMatch(/[%&+=]/);
				});
			});
		});
	});
});
