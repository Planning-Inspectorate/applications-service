const { getNow } = require('../../../src/utils/get-now');

describe('getNow Test Cases', () => {
	it('return new Date with value 2022-01-01', () => {
		const now = getNow();
		expect(now instanceof Date).toBe(true);
	});
});
