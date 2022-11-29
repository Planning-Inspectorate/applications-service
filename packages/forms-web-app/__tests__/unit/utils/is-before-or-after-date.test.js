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
			describe('and there are no date examinations end or stage 4 extension', () => {
				let result;
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2022-09-22'));
					result = getDateTimeExaminationEnds(undefined, undefined, '2022-09-22');
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('The examination is expected to close on 22 March 2023');
				});
			});
			describe('and there both date and extension date are null dates', () => {
				let result;
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2022-09-22'));
					result = getDateTimeExaminationEnds('0000-00-00', '0000-00-00', '2022-09-22');
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('The examination is expected to close on 22 March 2023');
				});
			});
			describe('and an extension has been granted', () => {
				let result;
				const extensionDate = '2023-04-22';
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = getDateTimeExaminationEnds(undefined, extensionDate, undefined);
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual(
						'The deadline for the close of the Examination has been extended to 22 April 2023'
					);
				});
			});
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
});
