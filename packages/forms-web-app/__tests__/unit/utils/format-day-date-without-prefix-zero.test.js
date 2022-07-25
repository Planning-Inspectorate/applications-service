const { formatDate } = require('../../../src/utils/date-utils');

describe('Remove Zero Prefix From Day Date Tests', () => {
	const inputs = {
		// Falsy Inputs
		input1: '',
		input2: false,
		input3: undefined,
		input4: null,
		input5: 0,
		// Number Input
		input6: 10,
		// Array Input
		input7: [],
		// Object Input
		input8: {},
		// Malformed Date Strings Format Input
		input9: '2022',
		input10: '01',
		input11: '2022 10 22',
		// Expected Date String Format Input
		input12: '2022-10-10',
		// Expected Date String Format With 0 Prefix For Day Date Input
		input13: '2022-10-09',
		input14: '2022-01-01'
	};

	const expectedValues = {
		// Expected Value Until Input 11
		returnEmptyString: '',
		// Expected Value Date String Format
		correctValue1: '10 October 2022',
		// Expected Value Date String Format With 0 Prefix For Day Date
		correctValue2: '9 October 2022',
		correctValue3: '1 January 2022'
	};

	// assertion result and expectation code gets repeated so this function saves lines
	// and makes assertions simple to be written
	const assertionDeclaration = (inputValue, expectedResultValue) => {
		const result = formatDate(inputValue);
		return expect(result).toBe(expectedResultValue);
	};

	Object.entries(inputs).forEach(([inputName, inputValue], index) => {
		// if index less than 11 return the same expected value = returnEmptyString
		if (index < 11) {
			it(`Test if ${inputName} returns expected value`, () => {
				assertionDeclaration(inputValue, expectedValues['returnEmptyString']);
			});
			return;
		}
		// else expected value is equal to correctValue plus index - 10
		it(`Test if ${inputName} returns expected value`, () => {
			assertionDeclaration(inputValue, expectedValues[`correctValue${index - 10}`]);
		});
	});
});
