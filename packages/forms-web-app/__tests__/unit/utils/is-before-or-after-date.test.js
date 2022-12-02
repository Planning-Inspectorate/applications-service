const {
	isBeforeNowUTC,
	getDateTimeExaminationEnds,
	getConfirmedStartOfExamination
} = require('../../../src/utils/is-before-or-after-date');

describe('#utils/is-before-or-after-date', () => {
	describe('#isBeforeNowUTC', () => {
		describe('When checking if a date is before today', () => {
			describe('and the date is undefined', () => {
				let result;
				beforeEach(() => {
					result = isBeforeNowUTC();
				});
				it('should return undefined', () => {
					expect(result).toBeUndefined();
				});
			});
			describe('and the date is not a string', () => {
				let result;
				let date = 1;
				beforeEach(() => {
					result = isBeforeNowUTC(date);
				});
				it('should return undefined', () => {
					expect(result).toBeUndefined();
				});
			});
			describe('and the date is before today', () => {
				const date = '2019-01-01';
				let result;
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = isBeforeNowUTC(date);
				});
				it('should ', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and the date is after today', () => {
				const date = '2022-01-01';
				let result;
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = isBeforeNowUTC(date);
				});
				it('should ', () => {
					expect(result).toEqual(true);
				});
			});
		});
	});
	describe('#getDateTimeExaminationEnds', () => {
		describe('When getting the correct sentence if a date is before or after today`s date', () => {
			describe('and the date is before today', () => {
				let result;
				const date = '2019-01-01';
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = getDateTimeExaminationEnds(date, undefined, undefined);
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('The examination closed on 1 January 2019');
				});
			});
			describe('and the date is after today', () => {
				let result;
				const date = '2022-01-01';
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = getDateTimeExaminationEnds(date, undefined, undefined);
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('The examination is expected to close on 1 January 2022');
				});
			});
			describe('and all dates are valid', () => {
				let result;
				const extensionDate = '2023-04-22';
				const date = '2022-08-19';
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('The examination is expected to close on 19 August 2022');
				});
			});
			describe('and date and extension are bad', () => {
				describe('and both dates are bad', () => {
					let result;
					const extensionDate = null;
					const date = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual(
							'The deadline for the close of the Examination has been extended to 14 March 2023'
						);
					});
				});
			});
			describe('and the date is good and the extension is bad', () => {
				describe('is before', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00 00:00:00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination closed on 22 April 2022');
					});
				});
				describe('is after', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00 00:00:00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2022');
					});
				});
				describe('and the extensionDate is 0000-00-00 00:00:00 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00 00:00:00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2022');
					});
				});
				describe('and the extensionDate is 0000 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2022');
					});
				});
				describe('and the extensionDate is 0000:00:00 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = null;
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2022');
					});
				});
			});
			describe('and the date is bad', () => {
				describe('and the date is 0000:00:00 and extension date is good, and startDate is good', () => {
					let result;
					const extensionDate = '2023-04-22';
					const nullDate = '0000-00-00 00:00:00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2023');
					});
				});
				describe('and the date is 0000 and extension date is good, and startDate is good', () => {
					let result;
					const extensionDate = '2023-04-22';
					const nullDate = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2023');
					});
				});
				describe('and the date is null and extension date is good, and startDate is good', () => {
					let result;
					const extensionDate = '2023-04-22';
					const nullDate = null;
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14');
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination is expected to close on 22 April 2023');
					});
				});
			});
		});
	});
});
describe('#getConfirmedStartOfExamination', () => {
	describe('When getting the correct sentence if a date is before or after today`s date', () => {
		describe('and the date is before today', () => {
			let result;
			const date = '2019-01-01';
			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
				result = getConfirmedStartOfExamination(date);
			});
			it('should return the correct before date sentence. ', () => {
				expect(result).toEqual('The examination opened on 1 January 2019');
			});
		});
		describe('and the date is after today', () => {
			let result;
			const date = '2022-01-01';
			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
				result = getConfirmedStartOfExamination(date);
			});
			it('should return the correct before date sentence. ', () => {
				expect(result).toEqual('The examination opens on 1 January 2022');
			});
		});
	});
});
