const { getFilters: getSharedFilters } = require('../../../_utils/filters/get-filters');
const { projectSearchI18nNamespace } = require('../../config');
const { getProjectSearchURL } = require('../get-project-search-url');

const getFilters = (i18n, query, rawFilters) =>
	getSharedFilters(i18n, query, rawFilters, projectSearchI18nNamespace, getProjectSearchURL());

module.exports = { getFilters };
