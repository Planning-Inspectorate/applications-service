const { fetchDocuments, getAvailableFilters } = require('../services/document.ni.service');
const config = require('../lib/config');
const toCamelCase = require('lodash.camelcase');
const { mapDocumentFilterLabel } = require('../utils/documentFilterLabelMapper');

const getDocuments = async (req, res) => {
	const requestFilters = {
		caseReference: req.body.caseReference,
		page: req.body.page || 1,
		itemsPerPage: Math.min(req.body.size || 25, 100),
		filters: req.body.filters,
		searchTerm: req.body.searchTerm,
		datePublishedFrom: req.body.datePublishedFrom,
		datePublishedTo: req.body.datePublishedTo
	};

	const [documents, availableFilters] = await Promise.all([
		fetchDocuments(requestFilters),
		getAvailableFilters(requestFilters.caseReference)
	]);

	const paginationData = {
		totalItems: documents.count,
		itemsPerPage: requestFilters.itemsPerPage,
		totalPages: Math.ceil(Math.max(1, documents.count) / requestFilters.itemsPerPage),
		currentPage: requestFilters.page
	};

	return res.status(200).send({
		documents: mapDocuments(documents.rows),
		filters: mapFilters(availableFilters),
		...paginationData
	});
};

const mapDocuments = (documents) => {
	const attributesToLowerCase = (document) =>
		Object.keys(document).reduce((memo, key) => {
			let value = document[key];

			if (key === 'path') value = config.documentsHost.concat(value);

			memo[toCamelCase(key)] = value;

			return memo;
		}, {});

	return documents.map(attributesToLowerCase);
};

const mapFilters = (input) => {
	const appendFilter = (filterGroup, filter, filterName) => {
		const filterValue = filter[filterName];
		if (!filterGroup[filterValue]) {
			filterGroup[filterValue] = {
				name: filterName,
				value: filterValue,
				label: mapDocumentFilterLabel(filterName, filterValue),
				count: 0,
				type: []
			};
		}
		filterGroup[filterValue].count += filter.count;
		filterGroup[filterValue].type.push({
			value: filter.filter_1,
			count: filter.count
		});
		return filterGroup;
	};

	const groupedFilters = input.reduce(
		(memo, filter) => {
			memo.stages = appendFilter(memo.stages, filter, 'stage');

			if (filter.category) memo.categories = appendFilter(memo.categories, filter, 'category');

			return memo;
		},
		{ stages: {}, categories: {} }
	);

	const stageFilters = Object.values(groupedFilters.stages);
	const categoryFilters = Object.values(groupedFilters.categories);

	return stageFilters.concat(categoryFilters);
};

module.exports = {
	getDocuments
};
