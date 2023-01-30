const {
	getEvent
} = require('../../../../../../../../src/controllers/projects/examination-timetable/utils/events/event/get-event');

describe('controllers/projects/examination-timetable/utils/events/event/get-event', () => {
	describe('#getEvent', () => {
		describe('When getting the data for an event', () => {
			let result;
			const datePresent = '2023-01-02';
			const dateFuture = '2023-01-03';
			const datePast = '2023-01-01';
			const mockEvent = {
				dateOfEvent: dateFuture,
				dateTimeDeadlineStart: datePast,
				description: '<p>mock description</p>',
				title: 'mock title',
				uniqueId: 'mock id',
				typeOfEvent: 'Deadline'
			};

			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date(datePresent));
				result = getEvent(mockEvent);
			});

			it('should return the formatted event data', () => {
				expect(result).toEqual({
					description: '<p>mock description</p>',
					eventTitle: 'mock title',
					id: 'mock id',
					inputId: 'project-examination-timetable',
					state: {
						isSubmissionOpen: true,
						tag: { classes: 'govuk-tag govuk-tag--blue', text: 'Open' }
					},
					title: `3 January 2023 - mock title`,
					typeOfEvent: 'Deadline'
				});
			});
		});
	});
});
