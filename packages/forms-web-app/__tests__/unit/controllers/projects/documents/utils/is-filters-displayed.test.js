const {
	isFiltersDisplayed
} = require('../../../../../../src/controllers/projects/documents/utils/is-filters-displayed');

describe('controllers/projects/documents/utils/is-filters-displayed', () => {
	describe('#isFiltersDisplayed', () => {
		describe('When determining to display the filters on the documents page', () => {
			describe('and there is more than one filter option', () => {
				let result;
				beforeEach(() => {
					const mockFilters = ['mock filter 1', 'mock filter 2'];
					result = isFiltersDisplayed(mockFilters);
				});
				it('should display the filters on the documents page', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and there is less than two filter options', () => {
				let result;
				beforeEach(() => {
					const mockFilters = ['mock filter 1'];
					result = isFiltersDisplayed(mockFilters);
				});
				it('should not display the filters on the documents page', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
