// const { validateParameters, validateTypes } = require('./validate-parameters');

const getCategoryFilterType = (categoryTypeFilters, filterTypeItemName) => {
	if (
		// validateParameters(
		// 	{ expectedType: validateTypes('array'), paramValue: categoryTypeFilters },
		// 	{ expectedType: validateTypes('string'), paramValue: filterTypeItemName }
		// )
		!categoryTypeFilters ||
		!Array.isArray(categoryTypeFilters) ||
		categoryTypeFilters.length === 0 ||
		!filterTypeItemName ||
		typeof filterTypeItemName !== 'string'
	) {
		return;
	}

	try {
		let i = 0;
		let result;
		const regex = new RegExp(filterTypeItemName, 'i');

		while (i < categoryTypeFilters.length) {
			const categoryObject = categoryTypeFilters[i];
			const { category: typeName } = categoryObject;

			if (regex.test(typeName)) {
				result = categoryObject;
				break;
			}
			i++;
		}

		if (result) {
			return [{ name: 'Application Document', count: result.count }];
		}

		return;
	} catch (err) {
		console.error(err);
	}
};

const category = [
	{ category: 'NULL', count: 18 },
	{ category: null, count: 0 },
	{ category: "Developer's Application", count: 258 }
];

const typeFiltersAvailable = [
	{ filter_1: 'Environmental Statement', count: 221 },
	{ filter_1: 'Additional Submissions', count: 18 },
	{ filter_1: 'Plans', count: 11 },
	{ filter_1: 'Other Documents', count: 10 },
	{ filter_1: 'Reports', count: 8 },
	{ filter_1: 'Environmental Impact Assessment Scoping', count: 5 },
	{ filter_1: 'Application Form', count: 5 },
	{ filter_1: 'Adequacy of Consultation Representation', count: 5 },
	{ filter_1: 'Draft Development Consent Orders', count: 3 },
	{ filter_1: 'Compulsory Acquisition Information', count: 3 },
	{ filter_1: 'Notice of Proposed application', count: 2 },
	{ filter_1: 'Procedural Decisions', count: 2 },
	{ filter_1: 'Acceptance letter', count: 1 },
	{ filter_1: 'Transboundary', count: 1 },
	{ filter_1: 'Procedural Decisions ', count: 1 },
	{ filter_1: 'Certificates and Notices', count: 1 }
];

const result = getCategoryFilterType(category, "Developer's Application");

console.warn({ result });

module.exports = { getCategoryFilterType };
