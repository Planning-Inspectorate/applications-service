const { hasDecisionDatePassed } = require('./has-decision-date-passed');

describe('has-decision-date-passed', () => {
	describe('hasDecisionDatePassed', () => {
		const today = '2024-01-30';
		const testDateOne = '2024-01-30';
		const testDateTwo = '2023-03-10';
		const testDateThree = '2025-09-17';

		beforeAll(() => {
			jest.useFakeTimers().setSystemTime(new Date(today));
		});

		it('returns true if the date today is the same as the date passed in', () => {
			expect(hasDecisionDatePassed(testDateOne)).toEqual(true);
		});

		it('returns true if the date today is after the date passed in', () => {
			expect(hasDecisionDatePassed(testDateTwo)).toEqual(true);
		});

		it('returns false if the date today is before the date passed in', () => {
			expect(hasDecisionDatePassed(testDateThree)).toEqual(false);
		});
	});
});
