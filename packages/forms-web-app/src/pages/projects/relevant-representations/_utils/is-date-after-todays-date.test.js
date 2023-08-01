const { isDateAfterTodaysDate } = require('./is-date-after-todays-date');
describe('#isDateAfterTodaysDate', () => {
	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
	});
	it('should return true if the current date is greater than equal to the provided date', () => {
		expect(isDateAfterTodaysDate('2023-01-01')).toEqual(false);
	});
	it('should return false if the current date is less than the provided date', () => {
		expect(isDateAfterTodaysDate('2001-01-01')).toEqual(true);
	});
});
