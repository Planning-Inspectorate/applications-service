const config = require('../lib/config');
const toCamelCase = require('lodash').camelCase;

const mappedLabel = (cy, en) => ({
	cy,
	en
});

const LABEL_MAPPING = {
	stage: {
		// NI mapping
		1: mappedLabel('Cyn-ymgeisio', 'Pre-application'),
		2: mappedLabel('Derbyn', 'Acceptance'),
		3: mappedLabel('Cyn-archwiliad', 'Pre-examination'),
		4: mappedLabel('Archwiliad', 'Examination'),
		5: mappedLabel('Argymhelliad', 'Recommendation'),
		6: mappedLabel('Penderfyniad', 'Decision'),
		7: mappedLabel('Ôl-benderfyniad', 'Post-decision'),

		// back office mapping
		'pre-application': mappedLabel('Cyn-ymgeisio', 'Pre-application'),
		acceptance: mappedLabel('Derbyn', 'Acceptance'),
		'pre-examination': mappedLabel('Cyn-archwiliad', 'Pre-examination'),
		examination: mappedLabel('Archwiliad', 'Examination'),
		recommendation: mappedLabel('Argymhelliad', 'Recommendation'),
		decision: mappedLabel('Penderfyniad', 'Decision'),
		'post-decision': mappedLabel('Ôl-benderfyniad', 'Post-decision'),
		'developers-application': mappedLabel('Cais y datblygwr', `Developer's application`)
	},
	category: {
		developersapplication: mappedLabel('Cais y datblygwr', `Developer's application`)
	}
};

const mapDocumentFilterLabel = (filterName, filterValue) => {
	try {
		if (filterName === 'category') {
			// normalise filter name as NI DB contains mess of different values
			const normalisedKey = filterValue.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
			return LABEL_MAPPING[filterName][normalisedKey] || filterValue;
		}

		if (Number.isInteger(filterValue)) {
			return LABEL_MAPPING[filterName][filterValue];
		} else {
			return LABEL_MAPPING[filterName][filterValue.toLowerCase()];
		}
	} catch (e) {
		return filterValue;
	}
};

const mapDocuments = (documents) => {
	const attributesToLowerCase = (document) =>
		Object.keys(document).reduce((memo, key) => {
			let value = document[key];

			if (key === 'path' && value) value = config.documentsHost.concat(value);
			else if (key === 'stage') memo.stageLabel = mapDocumentFilterLabel('stage', value);

			memo[toCamelCase(key)] = value;

			return memo;
		}, {});

	return documents.map(attributesToLowerCase);
};

const mapBackOfficeDocuments = (documents) =>
	documents.map((document) => ({
		id: document.id,
		dataID: document.documentReference,
		case_reference: document.caseRef,
		stage: document.stage,
		stageLabel: mapDocumentFilterLabel('stage', document.stage),
		type: document.documentType,
		filter1: document.filter1,
		filter2: document.filter2,
		description: document.description,
		size: document.size,
		mime: document.mime,
		path: document.publishedDocumentURI,
		// status: 'Published', // should always be Published, so not needed in API response?
		datePublished: document.datePublished,
		// deadlineDate: "", // no equivalent in BO schema
		// personalName: '', // no equivalent in BO schema
		representative: document.representative,
		// whoFrom: null, // no equivalent in BO schema
		docReference: document.documentReference,
		author: document.author,
		// details: '', // no equivalent in BO schema
		lastModified: document.modifiedAt,
		dateCreated: document.createdAt
	}));

const mapFilters = (input) => {
	const appendFilter = (filterGroup, filter, filterName) => {
		const filterValue =
			Number.isInteger(filter[filterName]) || filterName === 'category'
				? filter[filterName]
				: filter[filterName].toLowerCase();

		if (!filterGroup[filterValue]) {
			filterGroup[filterValue] = {
				name: filterName,
				value: filterValue,
				label: mapDocumentFilterLabel(filterName, filterValue),
				count: 0,
				type: []
			};
		}
		filterGroup[filterValue].count += filter.total;
		filterGroup[filterValue].type.push({
			value: filter.filter1,
			count: filter.total
		});
		return filterGroup;
	};

	const groupedFilters = input.reduce(
		(memo, filter) => {
			if (filter.stage) memo.stages = appendFilter(memo.stages, filter, 'stage');
			if (filter.category) memo.categories = appendFilter(memo.categories, filter, 'category');

			return memo;
		},
		{ stages: {}, categories: {} }
	);

	const stageFilters = Object.values(groupedFilters.stages).sort(sortFunction);
	const categoryFilters = Object.values(groupedFilters.categories);

	return stageFilters.concat(categoryFilters);
};

const sortFunction = (a, b) => {
	const indexA = Object.keys(LABEL_MAPPING[a.name]).indexOf(a.value);
	const indexB = Object.keys(LABEL_MAPPING[b.name]).indexOf(b.value);
	return indexA < indexB ? -1 : indexA > indexB ? 1 : 0;
};

module.exports = {
	mapDocuments,
	mapFilters,
	mapBackOfficeDocuments
};
