const {
	getFiltersViewModel: getFiltersViewModelShared
} = require('../../../_utils/filters/get-filters-view-model-shared');

/**
 * Get filter view model for projects map page
 * Uses shared filter utility with projectsMap translation namespace
 */
const getFiltersViewModel = (i18n, filters) =>
	getFiltersViewModelShared(i18n, filters, 'projectsMap');

module.exports = { getFiltersViewModel };
