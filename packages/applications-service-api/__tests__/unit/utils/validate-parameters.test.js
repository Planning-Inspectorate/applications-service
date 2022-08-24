const { validateParameters } = require('../../../src/utils/validate-parameters');
const { falsyAndEmptyValues } = require('../mocks');

describe('All test cases for validateParameters', () => {
	const validFunctionParameters = {
		input1: { expectedType: 'number', paramValue: 1 },
		input2: { expectedType: 'string', paramValue: 'test' },
		input3: { expectedType: 'boolean', paramValue: true },
		input4: { expectedType: 'object', paramValue: { test: 'test' } },
		input5: { expectedType: 'array', paramValue: ['test'] }
	};

	falsyAndEmptyValues.forEach((falsyOrEmptyValue) => {
		it(`Pass a falsy or empty paramValue: ${JSON.stringify(
			falsyOrEmptyValue
		)} and expect false as return`, () => {
			const result = validateParameters({ paramValue: falsyOrEmptyValue });
			expect(result).toBe(false);
		});
	});

	Object.entries(validFunctionParameters).forEach(([key, { paramValue }]) => {
		it(`Pass valid ${key} with paramValue: ${JSON.stringify(
			paramValue
		)} but no expectedType, expect false as return`, () => {
			const result = validateParameters({ paramValue });
			expect(result).toBe(false);
		});
	});

	Object.entries(validFunctionParameters).forEach(([key, value]) => {
		const { paramValue, expectedType } = value;
		it(`Pass valid ${key} with paramValue: ${JSON.stringify(
			paramValue
		)} and valid expectedType: ${expectedType}, expect true as return`, () => {
			const result = validateParameters({
				paramValue,
				expectedType
			});
			expect(result).toBe(true);
		});
	});

	Object.entries(validFunctionParameters).forEach(([key, value]) => {
		const { paramValue, expectedType } = value;

		let invalidExpectedType;

		switch (expectedType) {
			case 'number':
				invalidExpectedType = 'string';
				break;

			case 'string':
				invalidExpectedType = 'number';
				break;

			case 'array':
				invalidExpectedType = 'object';
				break;

			case 'object':
				invalidExpectedType = 'array';
				break;

			case 'boolean':
				invalidExpectedType = 'array';
				break;

			default:
				break;
		}

		it(`Pass valid ${key} with paramValue: ${JSON.stringify(
			paramValue
		)} but invalid expectedType: ${invalidExpectedType}, expect false as return`, () => {
			const result = validateParameters({
				paramValue: paramValue,
				expectedType: invalidExpectedType
			});

			expect(result).toBe(false);
		});
	});

	it(`Pass valid paramValue: "test" but invalid expectedType: "test", expect false as return`, () => {
		const result = validateParameters({
			paramValue: 'test',
			expectedType: 'test'
		});

		expect(result).toBe(false);
	});
});
