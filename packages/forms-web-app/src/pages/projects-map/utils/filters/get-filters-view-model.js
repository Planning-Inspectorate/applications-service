const { buildFilterViewModel } = require('../../../_components/filters/build-filter-view-model');
const { projectsMapI18nNamespace } = require('../../config');

/**
 * Builds the filter view model for the projects map page
 *
 * This is a thin wrapper around the shared buildFilterViewModel that maintains
 * backward compatibility while delegating to the shared filter building logic.
 *
 * @param {Object} i18n - i18n instance
 * @param {Array} filters - Raw filters from the API
 * @returns {Array} Structured filter groups for the uiCheckboxAccordion component
 */
const getFiltersViewModel = (i18n, filters) => {
	return buildFilterViewModel(i18n, filters, projectsMapI18nNamespace);
};

module.exports = { getFiltersViewModel };
