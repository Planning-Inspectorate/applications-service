const { isEventDeadlineSubmissionOpen } = require('./get-event-deadline-submission-state');

describe('controllers/projects/examination-timetable/utils/events/event/helpers/get-event-deadline-submission-state', () => {
	const datePresent = '2023-01-02';
	const datePast = '2023-01-01';
	const dateUpcoming = '2023-01-03';
	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date(datePresent));
	});
	describe('#isEventDeadlineSubmissionOpen', () => {
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
							result = isEventDeadlineSubmissionOpen(mockEvent);
						});
						it('should return true', () => {
							expect(result).toEqual(true);
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
							result = isEventDeadlineSubmissionOpen(mockEvent);
						});
						it('should return false', () => {
							expect(result).toEqual(false);
						});
					});
				});
			});
		});
	});
});
