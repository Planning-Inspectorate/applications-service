const {
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	isTimetableTypeOfEventActionable
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

				beforeEach(() => {
					result = isTimetableDateOfEventPast(datePast);
				});

				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the event date is upcoming', () => {
				let result;

				beforeEach(() => {
					result = isTimetableDateOfEventPast(dateUpcoming);
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

						beforeEach(() => {
							result = isTimetableTypeOfEventDeadlineOpen('Deadline', dateUpcoming, datePast);
						});
						it('should return true', () => {
							expect(result).toEqual(true);
						});
					});
					describe('and the event deadline start date has not started', () => {
						let result;

						beforeEach(() => {
							result = isTimetableTypeOfEventDeadlineOpen('Deadline', dateUpcoming, dateUpcoming);
						});
						it('should return false', () => {
							expect(result).toEqual(false);
						});
					});
				});
			});
		});
	});

	describe('#isTimetableTypeOfEventActionable', () => {
		describe('When asserting if the type of event should trigger opening of the timetable', () => {
			let mockTypeOfEvent;

			describe('and the type of event is "deadline"', () => {
				mockTypeOfEvent = 'Deadline';
				const result = isTimetableTypeOfEventActionable(mockTypeOfEvent);
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the type of event is "procedural deadline" [source: NI]', () => {
				mockTypeOfEvent = 'Procedural DEADLINE';
				const result = isTimetableTypeOfEventActionable(mockTypeOfEvent);
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});

			describe('and the type of event is "procedural deadline (pre-examination)" [source: BO]', () => {
				mockTypeOfEvent = 'Procedural DEADLINE (pre-examination)';
				const result = isTimetableTypeOfEventActionable(mockTypeOfEvent);
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the type of event is not on the actionable events list', () => {
				mockTypeOfEvent = 'Not actionable deadline';
				const result = isTimetableTypeOfEventActionable(mockTypeOfEvent);
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
