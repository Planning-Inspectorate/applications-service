const { replaceControllerParamType } = require('../../../src/utils/replace-controller-param-type');

describe('All test cases', () => {
	const inputValues = {
		unexpected: {
			input1: undefined,
			input2: null,
			input3: '',
			input4: false,
			input5: {},
			input6: [],
			input7: 0
		},
		expected: {
			input1: 'Other Documents',
			input2: ['Other Documents'],
			input3: ['Other Documents', 'everything_else']
		}
	};

	const expectedValues = {
		expectedInputsReturn: {
			output1: 'everything_else',
			output2: ['everything_else']
		}
	};

	const { input1: expectedInput1 } = inputValues.expected;
	const { output1: expectedInputsReturnInput1 } = expectedValues.expectedInputsReturn;

	Object.entries(inputValues.unexpected).forEach(([inputName, inputValue]) => {
		it(`Check function return with unexpected ${inputName} in expectedParam field`, () => {
			const result = replaceControllerParamType(
				expectedInput1,
				inputValue,
				expectedInputsReturnInput1
			);
			expect(result).toBe(undefined);
		});
	});

	Object.entries(inputValues.unexpected).forEach(([inputName, inputValue]) => {
		it(`Check function return with unexpected ${inputName} in paramsType field`, () => {
			const result = replaceControllerParamType(
				inputValue,
				expectedInput1,
				expectedInputsReturnInput1
			);
			expect(result).toBe(undefined);
		});
	});

	Object.entries(inputValues.unexpected).forEach(([inputName, inputValue]) => {
		it(`Check function return with unexpected ${inputName} in both paramsType and expectedParam fields`, () => {
			const result = replaceControllerParamType(inputValue, inputValue, expectedInputsReturnInput1);
			expect(result).toBe(undefined);
		});
	});

	// Correct Input/Output Values
	Object.entries(inputValues.expected).forEach(([inputName], index) => {
		const expectedInput = inputValues.expected[inputName];
		const expectedResult = expectedValues.expectedInputsReturn['output2'];
		it(`Check function return with expected ${inputName} in both paramsType and expectedParam fields`, () => {
			const result = replaceControllerParamType(
				expectedInput, // paramsType
				expectedInput1, // expectedParam
				expectedInputsReturnInput1 // newParamType
			);

			if (index === 0) {
				expect(result).toBe(expectedInputsReturnInput1);
				return;
			}

			expect(result).toStrictEqual(expectedResult);
		});
	});
});
