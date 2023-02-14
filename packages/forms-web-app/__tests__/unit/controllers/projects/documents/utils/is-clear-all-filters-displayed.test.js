const {
	isClearAllFiltersDisplayed
} = require('../../../../../../src/controllers/projects/documents/utils/is-clear-all-filters-displayed');

describe('controllers/projects/documents/utils/is-clear-all-filters-displayed', () => {
	describe('#isClearAllFiltersDisplayed', () => {
		describe('When determining if the clear all filters is displayed on the documents page', () => {
			describe('and there is no search term or active filters', () => {
				let result;
				const mockQuery = {
					searchTerm: ''
				};
				const mockActiveFilters = [];
				beforeEach(() => {
					result = isClearAllFiltersDisplayed(mockQuery, mockActiveFilters);
				});
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and there is a search term and no active filters', () => {
				let result;
				const mockQuery = {
					searchTerm: 'mock search term'
				};
				const mockActiveFilters = [];
				beforeEach(() => {
					result = isClearAllFiltersDisplayed(mockQuery, mockActiveFilters);
				});
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and there is active filters and no search term', () => {
				let result;
				const mockQuery = {
					searchTerm: ''
				};
				const mockActiveFilters = ['mock active filter 1'];
				beforeEach(() => {
					result = isClearAllFiltersDisplayed(mockQuery, mockActiveFilters);
				});
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
		});
	});
});
