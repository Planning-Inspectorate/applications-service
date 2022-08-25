const { buildQueryParams } = require('../../../src/utils/build-query-params');
const { falsyAndEmptyValues } = require('../mocks');

const queryNames = ['stage', 'category', 'type'];
const queryUrl = { emptyValue: '', someValue: "&type=Deadline 2&category=Developer's Application" };
const { emptyValue, someValue } = queryUrl;
const paramCategory = "Developer's Application";
const paramTypes = ['Deadline 2', 'Deadline 3', 'Deadline 4', 'Deadline 7', 'everything_else'];
const paramStages = ['1', '2', '3', '4', '5', '7'];

describe('All test cases', () => {
	let i = 0;
	let j = 1;

	while (i < 3) {
		falsyAndEmptyValues
			.filter((item) => typeof item !== 'string')
			.forEach((falsyOrEmptyValue, index) => {
				it(`Input ${j}, pass falsy or empty value: ${JSON.stringify(
					falsyOrEmptyValue
				)} and expect return of empty string`, () => {
					const result =
						i === 0
							? buildQueryParams(falsyOrEmptyValue, queryNames[0], someValue)
							: i === 1
							? buildQueryParams(paramCategory, falsyOrEmptyValue, someValue)
							: buildQueryParams(paramTypes, queryNames[2], falsyOrEmptyValue);
					expect(result).toBe('');
				});
				j++;
			});

		i++;
	}

	for (let i = 0; i < 3; i++) {
		const expectedResult = [
			'&stage=1&stage=2&stage=3&stage=4&stage=5&stage=7',
			"&category=Developer's Application",
			'&type=Deadline 2&type=Deadline 3&type=Deadline 4&type=Deadline 7&type=everything_else'
		];
		it(`Input ${i}, pass queryUrl not empty and expect: ${expectedResult[i]}`, () => {
			const result =
				i === 0
					? buildQueryParams(paramStages, queryNames[0], emptyValue)
					: i === 1
					? buildQueryParams(paramCategory, queryNames[1], emptyValue)
					: buildQueryParams(paramTypes, queryNames[2], emptyValue);
			expect(result).toBe(expectedResult[i]);
		});
	}

	for (let i = 0; i < 3; i++) {
		const expectedResult = [
			"&type=Deadline 2&category=Developer's Application&stage=1&stage=2&stage=3&stage=4&stage=5&stage=7",
			"&type=Deadline 2&category=Developer's Application&category=Developer's Application",
			"&type=Deadline 2&category=Developer's Application&type=Deadline 2&type=Deadline 3&type=Deadline 4&type=Deadline 7&type=everything_else"
		];
		it(`Input ${i}, pass empty queryUrl and expect: ${expectedResult[i]}`, () => {
			const result =
				i === 0
					? buildQueryParams(paramStages, queryNames[0], someValue)
					: i === 1
					? buildQueryParams(paramCategory, queryNames[1], someValue)
					: buildQueryParams(paramTypes, queryNames[2], someValue);
			expect(result).toBe(expectedResult[i]);
		});
	}
});
