const { lowerCase, titleCase, upperCase } = require('../../../src/utils/string-case');

describe('utils/string-case', () => {
	const valueToExpect = {
		lowerCase: {
			inputOne: 'ABCD',
			inputTwo: null
		},
		titleCase: {
			inputOne: 'abCd Efgh',
			inputTwo: null
		},
		upperCase: {
			inputOne: 'abcd',
			inputTwo: null
		}
	};

	const valueToEqual = {
		lowerCase: {
			inputOne: 'abcd',
			inputTwo: ''
		},
		titleCase: {
			inputOne: 'Abcd efgh',
			inputTwo: ''
		},
		upperCase: {
			inputOne: 'ABCD',
			inputTwo: ''
		}
	};

	test(`lowerCase`, () => {
		expect(lowerCase(valueToExpect.lowerCase.inputOne)).toEqual(valueToEqual.lowerCase.inputOne);
		expect(lowerCase(valueToExpect.lowerCase.inputTwo)).toEqual(valueToEqual.lowerCase.inputTwo);
	});

	test(`titleCase`, () => {
		expect(titleCase(valueToExpect.titleCase.inputOne)).toEqual(valueToEqual.titleCase.inputOne);
		expect(titleCase(valueToExpect.titleCase.inputTwo)).toEqual(valueToEqual.titleCase.inputTwo);
	});

	test(`upperCase`, () => {
		expect(upperCase(valueToExpect.upperCase.inputOne)).toEqual(valueToEqual.upperCase.inputOne);
		expect(upperCase(valueToExpect.upperCase.inputTwo)).toEqual(valueToEqual.upperCase.inputTwo);
	});
});
