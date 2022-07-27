const { formatDate } = require('../../../src/utils/date-utils');

describe('Remove Zero Prefix From Day Date Tests', () => {
	const inputs = {
		falsyValues: {
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
			input11: '2022 10 22'
		},
		truthyValues: {
			// Expected Date String Format Input
			input1: '2022-10-10',
			// Expected Date String Format With 0 Prefix For Day Date Input
			input2: '2022-10-09',
			input3: '2022-01-01'
		}
	};

	const expectedValues = {
		falsyValues: {
			// Expected Value Until Input 11
			returnEmptyString: ''
		},
		truthyValues: {
			// Expected Value Date String Format
			correctValue1: '10 October 2022',
			// Expected Value Date String Format With 0 Prefix For Day Date
			correctValue2: '9 October 2022',
			correctValue3: '1 January 2022'
		}
	};

	// assertion result and expectation code gets repeated so this function saves lines
	// and makes assertions simple to be written
	const assertionDeclaration = (inputValue, expectedResultValue) => {
		const result = formatDate(inputValue);
		expect(result).toBe(expectedResultValue);
	};

	Object.entries(inputs.falsyValues).forEach((falsyArray) => {
		const [inputKey, inputValue] = falsyArray;
		it(`Test if falsy value ${inputKey} returns expected value`, () => {
			assertionDeclaration(inputValue, expectedValues['falsyValues']['returnEmptyString']);
		});
	});

	Object.entries(inputs.truthyValues).forEach((truthyArray, index) => {
		const [inputKey, inputValue] = truthyArray;
		it(`Test if truthy value ${inputKey} returns expected value`, () => {
			assertionDeclaration(inputValue, expectedValues['truthyValues'][`correctValue${index + 1}`]);
		});
	});
});
