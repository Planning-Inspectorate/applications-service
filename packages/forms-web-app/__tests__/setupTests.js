require('@testing-library/jest-dom');

const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

const clearAllObjValues = (translations) =>
	Object.keys(translations).reduce((acc, key) => {
		if (typeof translations[key] === 'object') acc[key] = clearAllObjValues(translations[key]);
		else acc[key] = '';

		return acc;
	}, {});

function toHaveSameKeys(a, b) {
	const aKeys = clearAllObjValues(a);
	const bKeys = clearAllObjValues(b);

	return {
		pass: this.equals(aKeys, bKeys),
		message: () =>
			`Expected: ${this.utils.printExpected(aKeys)}\nReceived: ${this.utils.printReceived(bKeys)}`
	};
}

expect.extend({ toHaveSameKeys });
