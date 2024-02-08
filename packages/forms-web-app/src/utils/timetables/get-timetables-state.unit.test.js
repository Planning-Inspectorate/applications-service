const {
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables,
	getHasProjectTimetables
} = require('./get-timetables-state');

const { getTimetables } = require('../../lib/application-api-wrapper');
const { fixturesTimetableResponse } = require('../../services/__mocks__/timetable.fixtures');

jest.mock('../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('utils/timetables/get-timetables-state', () => {
	const datePresent = '2022-01-02';
	const datePast = '2022-01-01';
	const dateUpcoming = '2022-01-03';

	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date(datePresent));
	});

	describe('#getHasProjectTimetables', () => {
		describe('and there are no project timetables set in the session', () => {
			describe('and there is NO data returned from the api', () => {
				let hasTimetables;

				const mockSession = {};
				const mockCaseRef = 'mockCaseRef';
				const mockForceTimetableLookup = false;

				beforeEach(async () => {
					getTimetables.mockResolvedValue({ data: null });
					hasTimetables = await getHasProjectTimetables(
						mockSession,
						mockCaseRef,
						mockForceTimetableLookup
					);
				});

				it('should return false', () => {
					expect(hasTimetables).toEqual(false);
				});

				it('should set the has project timetables value to the session', () => {
					expect(mockSession).toEqual({ hasTimetables: { mockCaseRef: false } });
				});
			});

			describe('and there is data returned from the api', () => {
				describe('and the project has timetables', () => {
					let hasTimetables;

					const mockSession = { hasTimetables: { anotherCaseRef: false } };
					const mockCaseRef = 'mockCaseRef';
					const mockForceTimetableLookup = false;

					beforeEach(async () => {
						getTimetables.mockResolvedValue(fixturesTimetableResponse);
						hasTimetables = await getHasProjectTimetables(
							mockSession,
							mockCaseRef,
							mockForceTimetableLookup
						);
					});

					it('should return true', () => {
						expect(hasTimetables).toEqual(true);
					});

					it('should set the has project timetables value to the session', () => {
						expect(mockSession).toEqual({
							hasTimetables: { mockCaseRef: true, anotherCaseRef: false }
						});
					});
				});

				describe('and the project does not have timetables', () => {
					let hasTimetables;

					const mockSession = {};
					const mockCaseRef = 'mockCaseRef';
					const mockForceTimetableLookup = false;

					beforeEach(async () => {
						getTimetables.mockResolvedValue({ data: { timetables: [] } });
						hasTimetables = await getHasProjectTimetables(
							mockSession,
							mockCaseRef,
							mockForceTimetableLookup
						);
					});

					it('should return false', () => {
						expect(hasTimetables).toEqual(false);
					});

					it('should set the has project timetables value to the session', () => {
						expect(mockSession).toEqual({ hasTimetables: { mockCaseRef: false } });
					});
				});
			});
		});

		describe('and there are timetables set in the session', () => {
			describe('and a timetable lookup is not forced', () => {
				let hasTimetables;

				const mockCaseRef = 'mockCaseRef';
				const mockSession = { hasTimetables: { mockCaseRef: true } };
				const mockForceTimetableLookup = false;

				beforeEach(async () => {
					hasTimetables = await getHasProjectTimetables(
						mockSession,
						mockCaseRef,
						mockForceTimetableLookup
					);
				});

				it('should return true', () => {
					expect(hasTimetables).toEqual(true);
				});
			});

			describe('and a timetable lookup is forced', () => {
				let hasTimetables;

				const mockCaseRef = 'mockCaseRef';
				const mockSession = { hasTimetables: { mockCaseRef: false } };
				const mockForceTimetableLookup = true;

				beforeEach(async () => {
					getTimetables.mockResolvedValue(fixturesTimetableResponse);
					hasTimetables = await getHasProjectTimetables(
						mockSession,
						mockCaseRef,
						mockForceTimetableLookup
					);
				});

				it('should return true', () => {
					expect(hasTimetables).toEqual(true);
				});
			});
		});
	});

	describe('#getPastTimetables', () => {
		describe('When getting the past timetables', () => {
			let result;
			const mockTimetables = [
				{
					dateOfEvent: datePresent
				},
				{
					dateOfEvent: datePast
				},
				{
					dateOfEvent: dateUpcoming
				}
			];
			beforeEach(() => {
				result = getPastTimetables(mockTimetables);
			});
			it('should return the past timetables', () => {
				expect(result).toEqual([{ dateOfEvent: '2022-01-01' }]);
			});
		});
	});

	describe('#getUpcomingTimetables', () => {
		describe('When getting the upcoming timetables', () => {
			let result;
			const mockTimetables = [
				{
					dateOfEvent: datePresent
				},
				{
					dateOfEvent: datePast
				},
				{
					dateOfEvent: dateUpcoming
				}
			];
			beforeEach(() => {
				result = getUpcomingTimetables(mockTimetables);
			});
			it('should return the upcoming timetables', () => {
				expect(result).toEqual([{ dateOfEvent: '2022-01-02' }, { dateOfEvent: '2022-01-03' }]);
			});
		});
	});

	describe('#getOpenEventDeadlineTimetables', () => {
		describe('When getting open deadline timetables', () => {
			describe('and there are open deadline timetables', () => {
				let result;

				const mockTimetables = [
					{
						typeOfEvent: 'Not deadline',
						dateOfEvent: '2022-01-03',
						dateTimeDeadlineStart: '2022-02-03'
					},
					{
						typeOfEvent: 'Deadline',
						dateOfEvent: '2022-01-03',
						dateTimeDeadlineStart: '2022-01-03'
					},
					{
						typeOfEvent: 'Deadline',
						dateOfEvent: '2022-01-03',
						dateTimeDeadlineStart: '2022-01-02'
					},
					{
						typeOfEvent: 'Deadline',
						dateOfEvent: '2022-01-03',
						dateTimeDeadlineStart: '2022-01-04'
					}
				];

				beforeEach(() => {
					result = getOpenEventDeadlineTimetables(mockTimetables);
				});

				it('should return the open deadline timetables', () => {
					expect(result).toEqual([
						{
							dateOfEvent: '2022-01-03',
							dateTimeDeadlineStart: '2022-01-02',
							typeOfEvent: 'Deadline'
						}
					]);
				});
			});

			describe('and there are NO open deadline timetables', () => {
				let result;

				const mockTimetables = [
					{
						typeOfEvent: 'Deadline',
						dateOfEvent: datePast,
						dateTimeDeadlineStart: datePast
					},
					{
						typeOfEvent: 'Not deadline',
						dateOfEvent: dateUpcoming,
						dateTimeDeadlineStart: datePresent
					}
				];

				beforeEach(() => {
					result = getOpenEventDeadlineTimetables(mockTimetables);
				});

				it('should return no deadlines', () => {
					expect(result).toEqual([]);
				});
			});
		});
	});
});
