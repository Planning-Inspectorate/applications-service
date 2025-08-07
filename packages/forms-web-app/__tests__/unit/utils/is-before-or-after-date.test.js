const {
	isBeforeNowUTC,
	isBeforeTodayUTC,
	getDateTimeExaminationEnds,
	getConfirmedStartOfExamination
} = require('../../../src/utils/is-before-or-after-date');

const { mockI18n } = require('../../../src/pages/_mocks/i18n');
const examinationTimetableTranslation_EN = require('../../../src/pages/projects/examination-timetable/_translations/en.json');

const examinationTimetableTranslations = {
	examinationTimetable: examinationTimetableTranslation_EN
};
const i18n = mockI18n(examinationTimetableTranslations);

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

	describe('#isBeforeTodayUTC', () => {
		describe('When given datetime is today 09:00:00', () => {
			describe('and the current datetime is today 12:00:00', () => {
				it('should return false', () => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01 12:00:00'));
					const result = isBeforeTodayUTC('2020-01-01 09:00:00');
					expect(result).toEqual(false);
				});
			});
		});
		// today 00:00:00 should be treated as 23:59:59
		describe('When given datetime is today 00:00:00', () => {
			describe('and the current datetime is today 12:00:00', () => {
				it('should return true', () => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01 12:00:00'));
					const result = isBeforeTodayUTC('2020-01-01 00:00:00');
					expect(result).toEqual(true);
				});
			});
		});
		// no datetime is same as 00:00:00 so should be treated as 23:59:59
		describe('When given datetime does not have a time', () => {
			describe('and the current datetime is today 12:00:00', () => {
				it('should return true', () => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01 12:00:00'));
					const result = isBeforeTodayUTC('2020-01-01');
					expect(result).toEqual(true);
				});
			});
		});
		describe('When date is invalid', () => {
			it('should return undefined', () => {
				const result = isBeforeTodayUTC();
				expect(result).toBeUndefined();
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
					result = getDateTimeExaminationEnds(date, undefined, undefined, i18n);
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
					result = getDateTimeExaminationEnds(date, undefined, undefined, i18n);
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual('');
				});
			});

			describe('and all dates are valid', () => {
				let result;
				const extensionDate = '2023-04-22';
				const date = '2022-08-19';
				beforeEach(() => {
					jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
					result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
				});
				it('should return the correct before date sentence. ', () => {
					expect(result).toEqual(
						'The deadline for the close of the Examination has been extended to 22 April 2023'
					);
				});
			});

			describe('and date and extension are bad', () => {
				describe('is before', () => {
					let result;
					const extensionDate = null;
					const date = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('');
					});
				});
				describe('is after', () => {
					let result;
					const extensionDate = null;
					const date = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('The examination closed on 14 March 2023');
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
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
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
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('');
					});
				});

				describe('and the extensionDate is 0000-00-00 00:00:00 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00 00:00:00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('');
					});
				});

				describe('and the extensionDate is 0000 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('');
					});
				});

				describe('and the extensionDate is 0000:00:00 and date is good, and startDate is good', () => {
					let result;
					const date = '2022-04-22';
					const extensionDate = null;
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(date, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual('');
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
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual(
							'The deadline for the close of the Examination has been extended to 22 April 2023'
						);
					});
				});
				describe('and the date is 0000 and extension date is good, and startDate is good', () => {
					let result;
					const extensionDate = '2023-04-22';
					const nullDate = '0000-00-00';
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual(
							'The deadline for the close of the Examination has been extended to 22 April 2023'
						);
					});
				});
				describe('and the date is null and extension date is good, and startDate is good', () => {
					let result;
					const extensionDate = '2023-04-22';
					const nullDate = null;
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(nullDate, extensionDate, '2022-09-14', i18n);
					});
					it('should return the correct before date sentence. ', () => {
						expect(result).toEqual(
							'The deadline for the close of the Examination has been extended to 22 April 2023'
						);
					});
				});
				describe('and all dates are bad', () => {
					let result;
					beforeEach(() => {
						jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
						result = getDateTimeExaminationEnds(null, null, null, i18n);
					});
					it('should return empty string.', () => {
						expect(result).toEqual('');
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
				result = getConfirmedStartOfExamination(date, i18n);
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
				result = getConfirmedStartOfExamination(date, i18n);
			});
			it('should return the correct before date sentence. ', () => {
				expect(result).toEqual('The examination opens on 1 January 2022');
			});
		});
	});
});
