const { falsyAndEmptyValues } = require('../mocks');
const { getCategoryFilterType } = require('../../../src/utils/get-category-filter-type');

const categoryFilterParameterValue = [
	{ category: 'NULL', count: 18 },
	{ category: null, count: 0 },
	{ category: "Developer's application", count: 258 }
];

const categoryFilterResultValue = [{ count: 258, name: 'Application Document' }];

const developerApplication = "Developer's application";

describe('All test cases', () => {
	let i = 0;
	while (i < 2) {
		falsyAndEmptyValues.forEach((falsyOrEmptyValue, index) => {
			it(`Input ${index}. Pass falsy or empty value: ${JSON.stringify(
				falsyOrEmptyValue
			)} to getCategoryFilterType function parameter ${
				i === 0 ? 'categoryTypeFilters' : 'filterTypeItemName'
			} and expect undefined return`, () => {
				const result =
					i === 0
						? getCategoryFilterType(falsyOrEmptyValue, developerApplication)
						: getCategoryFilterType(categoryFilterParameterValue, falsyOrEmptyValue);
				expect(result).toBe(undefined);
			});
		});
		i++;
	}

	it('Pass correct parameters to function getCategoryFilterType but with make it throw and error and expect catch to be raised and it throws undefined', () => {
		const result = getCategoryFilterType([(() => Error('test'))()], developerApplication);
		expect(result).toBe(undefined);
	});

	it(`Pass correct parameters to function getCategoryFilterType and expect return value: ${JSON.stringify(
		categoryFilterResultValue
	)}`, () => {
		const result = getCategoryFilterType(categoryFilterParameterValue, developerApplication);
		expect(result).toStrictEqual(categoryFilterResultValue);
	});

	it(`Pass correct parameters to function getCategoryFilterType but first parameter with a single value and not match and expect undefined return, param value: ${JSON.stringify(
		[categoryFilterParameterValue[0]]
	)} return`, () => {
		const result = getCategoryFilterType([categoryFilterParameterValue[0]], developerApplication);
		expect(result).toStrictEqual(undefined);
	});

	it(`Pass correct parameters to function getCategoryFilterType but first parameter with a single value and matching values and expect ${JSON.stringify(
		categoryFilterResultValue
	)} return`, () => {
		const result = getCategoryFilterType([categoryFilterParameterValue[2]], developerApplication);
		expect(result).toStrictEqual(categoryFilterResultValue);
	});
});
