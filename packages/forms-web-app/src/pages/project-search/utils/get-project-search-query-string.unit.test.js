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
					expect(projectSearchQueryString).toEqual('?page=1&searchTerm=&size=25&sort=ProjectName');
				});
			});

			describe('and there are query parameters', () => {
				let projectSearchQueryString;

				beforeEach(() => {
					projectSearchQueryString = getProjectSearchQueryString({
						page: 2,
						itemsPerPage: 50,
						sortBy: 'mock sort by'
					});
				});

				it('should return the default project search query string', () => {
					expect(projectSearchQueryString).toEqual(
						'?page=2&searchTerm=&size=50&sort=mock%20sort%20by'
					);
				});
			});
		});
	});
});
