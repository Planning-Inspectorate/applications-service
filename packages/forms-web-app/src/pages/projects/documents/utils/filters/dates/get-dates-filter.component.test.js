const { getDatesFilter } = require('./get-dates-filter');

const {
	expectedNoQueryValuesDatesFilterObj,
	expectedFromDateIsBeforeToDateDatesFilterObj,
	expectedFromDateIsAfterToDateDatesFilterObj,
	expectedMissingDateValuesDatesFilterObj,
	expectedFromDateIsAfterTodayDatesFilterObj,
	expectedInvalidDateDatesFilterObj
} = require('./fixtures');

describe('projects/documents/utils/filters/dates/get-dates-filter', () => {
	describe('#getDatesFilter', () => {
		describe('When getting the dates filter for the documents page', () => {
			describe('and there are no date-from and date-to query values set', () => {
				let result;
				beforeEach(() => {
					const mockQuery = {};
					result = getDatesFilter(mockQuery);
				});
				it('should return the dates filter with no active filters, defined input values or errors', () => {
					expect(result).toEqual(expectedNoQueryValuesDatesFilterObj);
				});
			});
			describe('and all date-from and date-to query values are set', () => {
				describe('and the date-from date is before the date-to date', () => {
					let result;
					beforeEach(() => {
						const mockQuery = {
							'date-from-day': '1',
							'date-from-month': '1',
							'date-from-year': '2023',
							'date-to-day': '2',
							'date-to-month': '1',
							'date-to-year': '2023'
						};
						result = getDatesFilter(mockQuery);
					});
					it('should return the dates filter object with date-from and date-to active filters, defined date-from and date-to input values and no errors', () => {
						expect(result).toEqual(expectedFromDateIsBeforeToDateDatesFilterObj);
					});
				});
				describe('and the date-from date is before the date-to date', () => {
					let result;
					beforeEach(() => {
						const mockQuery = {
							'date-from-day': '2',
							'date-from-month': '1',
							'date-from-year': '2023',
							'date-to-day': '1',
							'date-to-month': '1',
							'date-to-year': '2023'
						};
						result = getDatesFilter(mockQuery);
					});
					it('should return the dates filter object with defined date-from and date-to input values, errors and no date-from and date-to active filters', () => {
						expect(result).toEqual(expectedFromDateIsAfterToDateDatesFilterObj);
					});
				});
			});
			describe('and there are missing date-from and/or date-to query values', () => {
				let result;
				beforeEach(() => {
					const mockQuery = {
						'date-from-day': '2',
						'date-from-month': '1',
						'date-from-year': '',
						'date-to-day': '',
						'date-to-month': '',
						'date-to-year': '2023'
					};
					result = getDatesFilter(mockQuery);
				});
				it('should return the dates filter object with defined date-from and/or date-to set input values, errors and no date-from and/or date-to active filters', () => {
					expect(result).toEqual(expectedMissingDateValuesDatesFilterObj);
				});
			});
			describe('and the date-from date is after today', () => {
				let result;
				beforeEach(() => {
					const mockQuery = {
						'date-from-day': '2',
						'date-from-month': '1',
						'date-from-year': '2023'
					};
					jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
					result = getDatesFilter(mockQuery);
				});
				it('should return the dates filter object with defined date-from input values, errors and no date-from active filter', () => {
					expect(result).toEqual(expectedFromDateIsAfterTodayDatesFilterObj);
				});
			});
			describe('and the date-from and/or date-to value is an invalid date', () => {
				let result;
				beforeEach(() => {
					const mockQuery = {
						'date-from-day': '32',
						'date-from-month': '1',
						'date-from-year': '2023',
						'date-to-day': '2',
						'date-to-month': 'abc',
						'date-to-year': '2023'
					};
					result = getDatesFilter(mockQuery);
				});
				it('should return the dates filter object with defined date-from and/or date-to input values, errors and no date-from and/or date-to active filters', () => {
					expect(result).toEqual(expectedInvalidDateDatesFilterObj);
				});
			});
		});
	});
});
