const { isNullSQLDate } = require('../../../src/utils/date-utils');

describe('date-utils Test Cases', () => {
	it('return false when date passed to isNullSQLDate', () => {
		expect(isNullSQLDate(new Date())).toBe(false);
	});
	it('return true when date is SQL null date', () => {
		expect(isNullSQLDate(new Date('0001-01-01 00:00:00'))).toBe(true);
	});
	it('return false when invalid date passed to isNullSQLDate', () => {
		expect(isNullSQLDate(NaN)).toBe(false);
	});
});
