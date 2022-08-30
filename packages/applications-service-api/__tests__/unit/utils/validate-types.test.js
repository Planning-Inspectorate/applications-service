const { validateTypes } = require('../../../src/utils/validate-parameters');
const { falsyAndEmptyValues } = require('../mocks');

describe('All test cases', () => {
	const functionInput = {
		validExpectInput: {
			input1: 'array',
			input2: 'string',
			input3: 'boolean',
			input4: 'number',
			input5: 'object',
			input6: 'Array',
			input7: 'String',
			input8: 'Boolean',
			input9: 'Number',
			input10: 'Object',
			input11: 'Arrays',
			input12: 'Strings',
			input13: 'Booleans',
			input14: 'Numbers',
			input15: 'Objects'
		},
		notExpectedInput: {
			input1: 'function',
			input2: 'test',
			input3: 'arays',
			input4: 'nmbers',
			input5: 'strig',
			input6: 'Arr',
			input7: 'Str',
			input8: 'Bool',
			input9: 'Num',
			input10: 'Obj'
		}
	};

	const expectedValues = ['array', 'string', 'boolean', 'number', 'object'];

	falsyAndEmptyValues.forEach((falseOrEmptyValue) => {
		it(`Pass falsy value: ${JSON.stringify(
			falseOrEmptyValue
		)}, and expect undefined return`, () => {
			const result = validateTypes(falseOrEmptyValue);
			expect(result).toBe(undefined);
		});
	});

	Object.entries(functionInput.notExpectedInput).forEach(([inputName, inputValue]) => {
		it(`Pass input: ${inputName}, unexpected value: ${JSON.stringify(
			inputValue
		)}, expect undefined return`, () => {
			const result = validateTypes(inputValue);
			expect(result).toBe(undefined);
		});
	});

	Object.entries(functionInput.validExpectInput).forEach(([inputName, inputValue], index) => {
		const expectedResult = index > 4 ? expectedValues[index % 5] : expectedValues[index];
		it(`Pass input: ${inputName}, expected value: ${JSON.stringify(
			inputValue
		)}, expect ${expectedResult} return`, () => {
			const result = validateTypes(inputValue);
			expect(result).toBe(expectedResult);
		});
	});
});
