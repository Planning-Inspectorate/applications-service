const { mapFilters } = require('../../../src/utils/map-filters');

describe('All Test Cases', () => {
	const falsyValues = [0, false, [], {}, '', undefined, null];
	const mockTypeFiltersAvailable = [
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

	const elementNameToFilter = 'other';
	const regex = new RegExp(elementNameToFilter, 'i');

	falsyValues.forEach((falsyValue, index) => {
		it(`Test mapFilters return in case of falsy value: ${JSON.stringify(
			falsyValue
		)} index: ${index} TypeFiltersAvailable array`, () => {
			const { result, otherTypesToAdd } = mapFilters(falsyValue, elementNameToFilter);

			expect(result).toBe(undefined);
			expect(otherTypesToAdd).toBe(undefined);
		});
	});

	it(`Test mapFilters return in case of missing second parameter: elementNameToFilter`, () => {
		const { result, otherTypesToAdd } = mapFilters(mockTypeFiltersAvailable);

		expect(result).toBe(undefined);
		expect(otherTypesToAdd).toBe(undefined);
	});

	it('mapFilters function should return mockTypeFiltersAvailable filtered and mapped as expected', () => {
		const filterAndMap = (boolean = true) =>
			mockTypeFiltersAvailable
				.filter(({ filter_1 }) => (boolean ? regex.test(filter_1) : !regex.test(filter_1)))
				.map(({ filter_1 }) => filter_1);

		const expectedResult = filterAndMap(false);

		const expectedOtherTypesToAdd = filterAndMap();

		const { result, otherTypesToAdd } = mapFilters(mockTypeFiltersAvailable, elementNameToFilter);

		expect(result).toStrictEqual(expectedResult);
		expect(otherTypesToAdd).toStrictEqual(expectedOtherTypesToAdd);
	});
});
