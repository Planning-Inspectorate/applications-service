const { sanitiseEncodeString } = require('../../../src/lib/sanitise-encode-string');

describe('lib/sanitise-encode-string', () => {
	const valueToExpect = {
		inputOne: `<h1>Heading</h1>`,
		inputTwo: `<b onmouseover=alert('Alert!')>click me!</b>`,
		inputThree: `%3Cb%20onmouseover%3Dalert('Alert!')%3Eclick%20me!%3C%2Fb%3E`,
		inputFour: `<IMG SRC=j&#X41vascript:alert('test2')>`,
		inputFive: [1, 2, 3]
	};

	const valueToEqual = {
		inputOne: 'Heading',
		inputTwo: 'click%20me!',
		inputThree: 'click%20me!',
		inputFour: '',
		inputFive: ''
	};

	test(`sanitise string`, () => {
		expect(sanitiseEncodeString(valueToExpect.inputOne)).toEqual(valueToEqual.inputOne);
		expect(sanitiseEncodeString(valueToExpect.inputTwo)).toEqual(valueToEqual.inputTwo);
		expect(sanitiseEncodeString(valueToExpect.inputThree)).toEqual(valueToEqual.inputThree);
		expect(sanitiseEncodeString(valueToExpect.inputFour)).toEqual(valueToEqual.inputFour);
		expect(sanitiseEncodeString(valueToExpect.inputFive)).toEqual(valueToEqual.inputFive);
	});
});
