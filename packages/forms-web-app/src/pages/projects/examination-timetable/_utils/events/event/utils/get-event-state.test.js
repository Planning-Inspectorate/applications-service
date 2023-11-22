const { getEventState } = require('./get-event-state');

const {
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	hasDeadlineItemsList
} = require('../../../../../../../utils/timetables/check-timetable-state');

jest.mock('../../../../../../../utils/timetables/check-timetable-state', () => ({
	isTimetableDateOfEventPast: jest.fn(),
	isTimetableTypeOfEventDeadlineOpen: jest.fn(),
	hasDeadlineItemsList: jest.fn()
}));

describe('controllers/projects/examination-timetable/utils/events/event/utils/get-event-state', () => {
	describe('#getEventState', () => {
		describe('When getting the event state', () => {
			const mockEvent = {};
			describe('and the event is not a deadline or the event deadline has not started', () => {
				let result;
				beforeEach(() => {
					isTimetableTypeOfEventDeadlineOpen.mockReturnValue(false);
					isTimetableDateOfEventPast.mockReturnValue(false);
					hasDeadlineItemsList.mockReturnValue(false);
					result = getEventState(mockEvent);
				});
				it('should return isSubmissionOpen as false with a null tag', () => {
					expect(result).toEqual({ isSubmissionOpen: false, tag: null });
				});
			});
			describe('and the event deadline submission is open', () => {
				let result;
				beforeEach(() => {
					isTimetableTypeOfEventDeadlineOpen.mockReturnValue(true);
					hasDeadlineItemsList.mockReturnValue(true);
					result = getEventState(mockEvent);
				});
				it('should return the event state object', () => {
					expect(result).toEqual({
						isSubmissionOpen: true,
						tag: { classes: 'govuk-tag govuk-tag--blue', text: 'Open' }
					});
				});
			});
			describe('and the event deadline is in the past', () => {
				let result;
				beforeEach(() => {
					isTimetableTypeOfEventDeadlineOpen.mockReturnValue(false);
					isTimetableDateOfEventPast.mockReturnValue(true);
					result = getEventState(mockEvent);
				});
				it('should return the event state object', () => {
					expect(result).toEqual({
						isSubmissionOpen: false,
						tag: { classes: 'govuk-tag', text: 'Closed' }
					});
				});
			});
			describe('and the event deadline is open', () => {
				beforeAll(() => {
					isTimetableTypeOfEventDeadlineOpen.mockReturnValue(true);
				});
				describe('and the event description has a deadline items list', () => {
					it('should return the event state object', () => {
						hasDeadlineItemsList.mockReturnValue(true);
						const result = getEventState(mockEvent);
						expect(result).toEqual({
							isSubmissionOpen: true,
							tag: { classes: 'govuk-tag govuk-tag--blue', text: 'Open' }
						});
					});
				});
				describe('and the event description does not have a deadline items list', () => {
					it('should return the event state object', () => {
						hasDeadlineItemsList.mockReturnValue(false);
						const result = getEventState(mockEvent);
						expect(result).toEqual({
							isSubmissionOpen: false,
							tag: { classes: 'govuk-tag', text: 'Closed' }
						});
					});
				});
			});
		});
	});
});
