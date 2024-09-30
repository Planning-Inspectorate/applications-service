const { getEvent } = require('./get-event');
const { mockI18n } = require('../../../../../_mocks/i18n');
const examinationTimetableTranslation_EN = require('../../../_translations/en.json');

const examinationTimetableTranslations = {
	examinationTimetable: examinationTimetableTranslation_EN
};
const i18n = mockI18n(examinationTimetableTranslations);

jest.mock('../../../../../../utils/timetables/check-timetable-state', () => ({
	...jest.requireActual('../../../../../../utils/timetables/check-timetable-state'),
	hasDeadlineItemsList: jest.fn().mockReturnValue(true)
}));
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
				result = getEvent(mockEvent, i18n);
			});

			it('should return the formatted event data', () => {
				expect(result).toEqual({
					description: '<p>mock description</p>',
					eventTitle: 'mock title',
					id: 'mock id',
					inputId: 'project-examination-timetable',
					state: {
						isSubmissionOpen: true,
						tag: { classes: 'govuk-tag govuk-tag--yellow', text: 'Open' }
					},
					title: `3 January 2023 - mock title`,
					typeOfEvent: 'Deadline'
				});
			});
		});
		describe('When getting the data for an event while selected language is Welsh', () => {
			let result;
			const datePresent = '2023-01-02';
			const dateFuture = '2023-01-03';
			const datePast = '2023-01-01';
			const mockWelshEvent = {
				dateOfEvent: dateFuture,
				dateTimeDeadlineStart: datePast,
				description: '<p>mock description</p>',
				descriptionWelsh: '<p>mock welsh description</p>',
				title: 'mock welsh title',
				uniqueId: 'mock id',
				typeOfEvent: 'Deadline'
			};

			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date(datePresent));
				result = getEvent(mockWelshEvent, { ...i18n, language: 'cy' });
			});

			it('should return the formatted event data using Welsh fields', () => {
				expect(result).toEqual({
					description: '<p>mock welsh description</p>',
					eventTitle: 'mock welsh title',
					id: 'mock id',
					inputId: 'project-examination-timetable',
					state: {
						isSubmissionOpen: true,
						tag: { classes: 'govuk-tag govuk-tag--yellow', text: 'Open' }
					},
					title: `3 Ionawr 2023 - mock welsh title`,
					typeOfEvent: 'Deadline'
				});
			});
		});
	});
});
