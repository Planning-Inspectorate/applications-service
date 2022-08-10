const { removeFilterTypes } = require('../../../src/utils/remove-filter-types');
const { falsyValues } = require('../mocks');

const typeFilters = [
	{ name: 'Environmental Statement', count: 221 },
	{ name: 'Additional Submissions', count: 18 },
	{ name: 'Plans', count: 11 },
	{ name: 'Other Documents', count: 10 },
	{ name: 'Reports', count: 8 },
	{ name: 'Environmental Impact Assessment Scoping', count: 5 },
	{ name: 'Application Form', count: 5 },
	{ name: 'Adequacy of Consultation Representation', count: 5 },
	{ name: 'Draft Development Consent Orders', count: 3 },
	{ name: 'Compulsory Acquisition Information', count: 3 },
	{ name: 'Notice of Proposed application', count: 2 },
	{ name: 'Procedural Decisions', count: 2 },
	{ name: 'Acceptance letter', count: 1 },
	{ name: 'Transboundary', count: 1 },
	{ name: 'Procedural Decisions ', count: 1 },
	{ name: 'Certificates and Notices', count: 1 }
];

const typeFiltersWithoutOtherDocuments = typeFilters.filter(({ name }) => !/other/i.test(name));

const typeFilterToRemove = 'other';
const expectedotherTypeFiltersCountReturn = 0;

describe('All test cases', () => {
	falsyValues.forEach((falsyValue, index) => {
		it(`Test how removeFilterTypes handles falsy value: ${JSON.stringify(
			falsyValue
		)}, index: ${index}`, () => {
			const { result, otherTypeFiltersCount } = removeFilterTypes(falsyValue, typeFilterToRemove);
			const expectedResultReturn = [];

			expect(result).toStrictEqual(expectedResultReturn);
			expect(otherTypeFiltersCount).toStrictEqual(expectedotherTypeFiltersCountReturn);
		});
	});

	falsyValues.forEach((falsyValue, index) => {
		it(`Test how removeFilterTypes handles falsy value: ${JSON.stringify(
			falsyValue
		)}, index: ${index}, but missing second parameter`, () => {
			const { result, otherTypeFiltersCount } = removeFilterTypes(falsyValue);
			const expectedResultReturn = [];

			expect(result).toStrictEqual(expectedResultReturn);
			expect(otherTypeFiltersCount).toStrictEqual(expectedotherTypeFiltersCountReturn);
		});
	});

	it('Test what removeFilterTypes returns when receiving typeFilters with matching type name "Other Documents"', () => {
		const { result, otherTypeFiltersCount } = removeFilterTypes(typeFilters, typeFilterToRemove);

		const expectedotherTypeFiltersCountReturn = 10;

		expect(result).toStrictEqual(typeFiltersWithoutOtherDocuments);
		expect(otherTypeFiltersCount).toStrictEqual(expectedotherTypeFiltersCountReturn);
	});

	it('Test what removeFilterTypes returns when receiving typeFiltersWithoutOtherDocuments without any matching type names', () => {
		const { result, otherTypeFiltersCount } = removeFilterTypes(
			typeFiltersWithoutOtherDocuments,
			typeFilterToRemove
		);

		expect(result).toStrictEqual(typeFiltersWithoutOtherDocuments);
		expect(otherTypeFiltersCount).toStrictEqual(expectedotherTypeFiltersCountReturn);
	});
});
