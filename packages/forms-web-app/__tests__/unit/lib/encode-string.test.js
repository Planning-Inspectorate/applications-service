const { encodeString } = require('../../../src/lib/encode-string');

describe('lib/encode-string', () => {
	const valueToExpect = {
		inputOne: 'Example of a String with some special characters which are & and £.',
		inputTwo: `< > & " '`,
		inputThree: [1, 2, 3]
	};

	const valueToEqual = {
		inputOne:
			'Example%20of%20a%20String%20with%20some%20special%20characters%20which%20are%20%26%20and%20%C2%A3.',
		inputTwo: `%3C%20%3E%20%26%20%22%20'`,
		inputThree: ''
	};

	test(`encode string`, () => {
		expect(encodeString(valueToExpect.inputOne)).toEqual(valueToEqual.inputOne);
		expect(encodeString(valueToExpect.inputTwo)).toEqual(valueToEqual.inputTwo);
		expect(encodeString(valueToExpect.inputThree)).toEqual(valueToEqual.inputThree);
	});
});
