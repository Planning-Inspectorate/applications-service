require('@testing-library/jest-dom');

const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

function toHaveSameKeys(a, b) {
	const aKeys = Object.keys(a).sort();
	const bKeys = Object.keys(b).sort();

	return {
		pass: this.equals(aKeys, bKeys),
		message: () =>
			`Expected: ${this.utils.printExpected(aKeys)}\nReceived: ${this.utils.printReceived(bKeys)}`
	};
}

expect.extend({ toHaveSameKeys });
