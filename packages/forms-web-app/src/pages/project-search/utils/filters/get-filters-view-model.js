const {
	getFiltersViewModel: getSharedFiltersViewModel
} = require('../../../_utils/filters/get-filters-view-model');
const { projectSearchI18nNamespace } = require('../../config');

/**
 * Get filters view model for project search page
 *
 * Wraps the shared getFiltersViewModel utility with project-search namespace.
 * This maintains backward compatibility while using centralized filter logic.
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {Array} filters - Raw filter data from API
 * @returns {Array} Formatted filter groups ready for checkbox accordion UI
 */
const getFiltersViewModel = (i18n, filters) =>
	getSharedFiltersViewModel(i18n, projectSearchI18nNamespace, filters);

module.exports = { getFiltersViewModel };
