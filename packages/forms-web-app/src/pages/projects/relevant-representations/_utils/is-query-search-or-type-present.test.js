const { isQuerySearchOrTypePresent } = require('./is-query-search-or-type-present');

describe('pages/projects/relevant-representations/_utils/is-query-search-or-type-present', () => {
	describe('#isQuerySearchOrTypePresent', () => {
		describe('When the query has a search term value', () => {
			const mockQuery = {
				searchTerm: 'mock search term'
			};
			const querySearchOrTypePresent = isQuerySearchOrTypePresent(mockQuery);
			it('should return true', () => {
				expect(querySearchOrTypePresent).toEqual(true);
			});
		});

		describe('When the query has a type value', () => {
			const mockQuery = {
				type: 'mock type'
			};
			const querySearchOrTypePresent = isQuerySearchOrTypePresent(mockQuery);
			it('should return true', () => {
				expect(querySearchOrTypePresent).toEqual(true);
			});
		});

		describe('When the query has a search term and type value', () => {
			const mockQuery = {
				searchTerm: 'mock search term',
				type: 'mock type'
			};
			const querySearchOrTypePresent = isQuerySearchOrTypePresent(mockQuery);
			it('should return true', () => {
				expect(querySearchOrTypePresent).toEqual(true);
			});
		});

		describe('When the query does not have a search term and type value', () => {
			const mockQuery = {};
			const querySearchOrTypePresent = isQuerySearchOrTypePresent(mockQuery);
			it('should return false', () => {
				expect(querySearchOrTypePresent).toEqual(false);
			});
		});
	});
});
