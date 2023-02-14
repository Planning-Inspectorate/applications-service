const isClearAllFiltersDisplayed = (query, activeFilters) =>
	!!query.searchTerm || activeFilters.length > 0;

module.exports = { isClearAllFiltersDisplayed };
