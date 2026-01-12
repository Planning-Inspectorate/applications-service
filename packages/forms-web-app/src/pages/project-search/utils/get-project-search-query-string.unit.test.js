const { getProjectSearchQueryString } = require('./get-project-search-query-string');

describe('project-search/utils/get-project-search-query-string', () => {
	describe('#getProjectSearchQueryString', () => {
		describe('When getting the project search query string', () => {
			describe('and there are no query parameters', () => {
				let projectSearchQueryString;

				beforeEach(() => {
					projectSearchQueryString = getProjectSearchQueryString({});
				});

				it('should return the default project search query string', () => {
					expect(projectSearchQueryString).toContain('searchTerm=');
					expect(projectSearchQueryString).toContain('size=25');
					expect(projectSearchQueryString).toContain('page=1');
					expect(projectSearchQueryString).toContain('sort=%2BProjectName');
				});
			});

			describe('and there are query parameters', () => {
				let projectSearchQueryString;

				beforeEach(() => {
					projectSearchQueryString = getProjectSearchQueryString({
						page: 2,
						itemsPerPage: 50,
						sortBy: 'mock sort by',
						searchTerm: 'mock search term',
						region: 'mock region',
						sector: ['mock sector 1', 'mock sector 2'],
						stage: 'mock stage'
					});
				});

				it('should return the project search query string with the query parameter values', () => {
					expect(projectSearchQueryString).toContain('searchTerm=mock%20search%20term');
					expect(projectSearchQueryString).toContain('size=50');
					expect(projectSearchQueryString).toContain('page=2');
					expect(projectSearchQueryString).toContain('sort=mock%20sort%20by');
					expect(projectSearchQueryString).toContain('region=mock%20region');
					expect(projectSearchQueryString).toContain('sector=mock%20sector%201');
					expect(projectSearchQueryString).toContain('sector=mock%20sector%202');
					expect(projectSearchQueryString).toContain('stage=mock%20stage');
				});
			});
		});
	});
});
