const { getFilters: getSharedFilters } = require('../../../_utils/filters/get-filters');
const { projectSearchI18nNamespace } = require('../../config');

const getFilters = (i18n, query, rawFilters) =>
	getSharedFilters(i18n, query, rawFilters, projectSearchI18nNamespace);

module.exports = { getFilters };
