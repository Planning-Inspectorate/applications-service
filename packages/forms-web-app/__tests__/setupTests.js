require('@testing-library/jest-dom');

const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

const clearAllObjValues = (translations) =>
	Object.keys(translations).forEach((key) => {
		if (typeof translations[key] === 'object') {
			clearAllObjValues(translations[key]);
		} else translations[key] = '';
	});

function toHaveSameKeys(a, b) {
	clearAllObjValues(a);
	clearAllObjValues(b);

	return {
		pass: this.equals(a, b),
		message: () =>
			`Expected: ${this.utils.printExpected(a)}\nReceived: ${this.utils.printReceived(b)}`
	};
}

expect.extend({ toHaveSameKeys });
