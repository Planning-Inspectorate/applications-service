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
					expect(projectSearchQueryString).toEqual(
						'?size=25&page=1&searchTerm=&sort=%2BProjectName'
					);
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
					expect(projectSearchQueryString).toEqual(
						'?size=50&page=2&searchTerm=mock%20search%20term&sort=mock%20sort%20by&region=mock%20region&sector=mock%20sector%201&sector=mock%20sector%202&stage=mock%20stage'
					);
				});
			});
		});
	});
});
