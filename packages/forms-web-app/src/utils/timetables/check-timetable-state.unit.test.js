const {
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	isTimetableTypeOfEventDeadline
} = require('./check-timetable-state');

describe('utils/check-timetable-state', () => {
	describe('#isTimetableDateOfEventPast', () => {
		describe('When checking if the event is a past event', () => {
			const datePresent = '2022-01-02';
			const datePast = '2022-01-01';
			const dateUpcoming = '2022-01-03';
			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date(datePresent));
			});
			describe('and the event date is in the past', () => {
				let result;
				const mockEvent = {
					dateOfEvent: datePast
				};
				beforeEach(() => {
					result = isTimetableDateOfEventPast(mockEvent);
				});
				it('should return true', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and the event date is upcoming', () => {
				let result;
				const mockEvent = {
					dateOfEvent: dateUpcoming
				};
				beforeEach(() => {
					result = isTimetableDateOfEventPast(mockEvent);
				});
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});

	describe('#isTimetableTypeOfEventDeadlineOpen', () => {
		const datePresent = '2023-01-02';
		const datePast = '2023-01-01';
		const dateUpcoming = '2023-01-03';
		beforeEach(() => {
			jest.useFakeTimers().setSystemTime(new Date(datePresent));
		});
		describe('When getting the value for is the event deadline submission open', () => {
			describe('and the event type is deadline', () => {
				describe('and the event date is upcoming', () => {
					describe('and the event deadline start date has started', () => {
						let result;
						const mockEvent = {
							typeOfEvent: 'Deadline',
							dateTimeDeadlineStart: datePast,
							dateOfEvent: dateUpcoming
						};
						beforeEach(() => {
							result = isTimetableTypeOfEventDeadlineOpen(mockEvent);
						});
						it('should return true', () => {
							expect(result).toEqual(false);
						});
					});
					describe('and the event deadline start date has not started', () => {
						let result;
						const mockEvent = {
							typeOfEvent: 'Deadline',
							dateTimeDeadlineStart: dateUpcoming,
							dateOfEvent: dateUpcoming
						};
						beforeEach(() => {
							result = isTimetableTypeOfEventDeadlineOpen(mockEvent);
						});
						it('should return false', () => {
							expect(result).toEqual(false);
						});
					});
				});
			});
		});
	});

	describe('#isTimetableTypeOfEventDeadline', () => {
		describe('When asserting if the type of event is deadline', () => {
			describe('and the type of event is deadline', () => {
				let result;
				const mockTypeOfEvent = 'Deadline';
				beforeEach(() => {
					result = isTimetableTypeOfEventDeadline(mockTypeOfEvent);
				});
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the type of event is not deadline', () => {
				let result;
				const mockTypeOfEvent = 'Not deadline';
				beforeEach(() => {
					result = isTimetableTypeOfEventDeadline(mockTypeOfEvent);
				});
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
