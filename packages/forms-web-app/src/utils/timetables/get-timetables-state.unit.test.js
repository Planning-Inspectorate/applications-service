const {
	getHasOpenTimetables,
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables
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

	describe('#getHasOpenTimetables', () => {
		describe('When there are open deadline for a timetable', () => {
			let response;
			beforeEach(async () => {
				jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
				getTimetables.mockReturnValue(fixturesTimetableResponse);
				response = await getHasOpenTimetables('mock case ref');
			});
			it('should return true', () => {
				expect(response).toBe(true);
			});

			describe('When there are NO open deadline for a timetable', () => {
				let response;
				beforeEach(async () => {
					jest.useFakeTimers().setSystemTime(new Date('2023-01-28'));
					getTimetables.mockReturnValue(fixturesTimetableResponse);
					response = await getHasOpenTimetables('mock case ref');
				});
				it('should return false', () => {
					expect(response).toBe(false);
				});
			});
		});

		describe('When there are NO timetables', () => {
			let response;
			beforeEach(async () => {
				jest.useFakeTimers().setSystemTime(new Date('2023-01-28'));
				getTimetables.mockReturnValue({ resp_code: 404 });
				response = await getHasOpenTimetables('mock case ref');
			});
			it('should return false', () => {
				expect(response).toBe(false);
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
		});
	});
});
