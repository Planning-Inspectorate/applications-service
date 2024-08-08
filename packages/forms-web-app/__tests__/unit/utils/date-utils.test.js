const { isNullSQLDate, setTimeToStartOfDay, formatDate } = require('../../../src/utils/date-utils');

describe('date-utils Test Cases', () => {
	describe('isNullSQLDate', () => {
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

	describe('formatDate', () => {
		it('should format date in Europe/London', () => {
			// BST
			expect(formatDate('2024-08-08T13:00Z')).toBe('8 August 2024');
			expect(formatDate('2024-08-07T23:00Z')).toBe('8 August 2024');
			// GMT
			expect(formatDate('2024-01-08T23:00Z')).toBe('8 January 2024');
		});
	});

	describe('setTimeToStartOfDay', () => {
		// is this util meant to be setting the start of day in Europe/London or UTC?
		// behaviour will be differently locally to on the server

		it('should set start of date in Europe/London', () => {
			const isoString = (value) => {
				return new Date(value).toISOString();
			};
			// BST
			expect(isoString(setTimeToStartOfDay('2024-08-08T13:00Z'))).toBe('2024-08-07T23:00:00.000Z');
			// GMT
			expect(isoString(setTimeToStartOfDay('2024-01-08T13:00Z'))).toBe('2024-01-08T00:00:00.000Z');
		});

		it('should set start of date in UTC', () => {
			const isoString = (value) => {
				return new Date(value).toISOString();
			};
			// BST
			expect(isoString(setTimeToStartOfDay('2024-08-08T13:00Z'))).toBe('2024-08-08T00:00:00.000Z');
			// GMT
			expect(isoString(setTimeToStartOfDay('2024-01-08T13:00Z'))).toBe('2024-01-08T00:00:00.000Z');
		});
	});
});
