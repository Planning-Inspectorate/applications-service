const { sanitiseString } = require('../../../src/lib/sanitise-string');

describe('lib/sanitise-string', () => {
	const valueToExpect = {
		inputOne: `<h1>Heading</h1>`,
		inputTwo: `<b onmouseover=alert('Alert!')>click me!</b>`,
		inputThree: `%3Cb%20onmouseover%3Dalert('Alert!')%3Eclick%20me!%3C%2Fb%3E`,
		inputFour: `<IMG SRC=j&#X41vascript:alert('test2')>`,
		inputFive: [1, 2, 3]
	};

	const valueToEqual = {
		inputOne: 'Heading',
		inputTwo: 'click me!',
		inputThree: 'click me!',
		inputFour: '',
		inputFive: ''
	};

	test(`sanitise string`, () => {
		expect(sanitiseString(valueToExpect.inputOne)).toEqual(valueToEqual.inputOne);
		expect(sanitiseString(valueToExpect.inputTwo)).toEqual(valueToEqual.inputTwo);
		expect(sanitiseString(valueToExpect.inputThree)).toEqual(valueToEqual.inputThree);
		expect(sanitiseString(valueToExpect.inputFour)).toEqual(valueToEqual.inputFour);
		expect(sanitiseString(valueToExpect.inputFive)).toEqual(valueToEqual.inputFive);
	});
});
