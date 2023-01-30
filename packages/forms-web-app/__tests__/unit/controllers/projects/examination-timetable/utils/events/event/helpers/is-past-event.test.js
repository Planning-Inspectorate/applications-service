const {
	isPastEvent
} = require('../../../../../../../../../src/controllers/projects/examination-timetable/utils/events/event/helpers/is-past-event');

describe('controllers/projects/examination-timetable/utils/events/event/helpers/is-past-event', () => {
	describe('#isPastEvent', () => {
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
					result = isPastEvent(mockEvent);
				});
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
			describe('and the event date is upcoming', () => {
				let result;
				const mockEvent = {
					dateOfEvent: dateUpcoming
				};
				beforeEach(() => {
					result = isPastEvent(mockEvent);
				});
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
		});
	});
});
