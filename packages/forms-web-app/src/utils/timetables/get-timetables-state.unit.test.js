const {
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables,
	getHasTimetables
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

	describe('#getHasTimetables', () => {
		describe('and there are no project timetables set in the session', () => {
			describe('and there is NO data returned from the api', () => {
				let hasTimetables;

				const mockSession = {};
				const mockCaseRef = 'mockCaseRef';

				beforeEach(async () => {
					getTimetables.mockResolvedValue({ data: null });
					hasTimetables = await getHasTimetables(mockSession, mockCaseRef);
				});

				it('should return false', () => {
					expect(hasTimetables).toEqual(false);
				});

				it('should set the projects timetables value to the session', () => {
					expect(mockSession).toEqual({ timetables: { mockCaseRef: false } });
				});
			});

			describe('and there is data returned from the api', () => {
				describe('and the project has timetables', () => {
					let hasTimetables;

					const mockSession = { timetables: { anotherCaseRef: false } };
					const mockCaseRef = 'mockCaseRef';

					beforeEach(async () => {
						getTimetables.mockResolvedValue(fixturesTimetableResponse);
						hasTimetables = await getHasTimetables(mockSession, mockCaseRef);
					});

					it('should return true', () => {
						expect(hasTimetables).toEqual(true);
					});

					it('should set the projects timetables value to the session', () => {
						expect(mockSession).toEqual({
							timetables: { mockCaseRef: true, anotherCaseRef: false }
						});
					});
				});

				describe('and the project does not have timetables', () => {
					let hasTimetables;

					const mockSession = {};
					const mockCaseRef = 'mockCaseRef';

					beforeEach(async () => {
						getTimetables.mockResolvedValue({ data: { timetables: [] } });
						hasTimetables = await getHasTimetables(mockSession, mockCaseRef);
					});

					it('should return false', () => {
						expect(hasTimetables).toEqual(false);
					});

					it('should set the projects timetables value to the session', () => {
						expect(mockSession).toEqual({ timetables: { mockCaseRef: false } });
					});
				});
			});
		});

		describe('and there are timetables set in the session', () => {
			let hasTimetables;

			const mockCaseRef = 'mockCaseRef';
			const mockSession = { timetables: { mockCaseRef: true } };

			beforeEach(async () => {
				hasTimetables = await getHasTimetables(mockSession, mockCaseRef);
			});

			it('should return true', () => {
				expect(hasTimetables).toEqual(true);
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
