const { getEvents } = require('./get-events');
const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const { mockI18n } = require('../../../../_mocks/i18n');
const examinationTimetableTranslation_EN = require('../../_translations/en.json');

const examinationTimetableTranslations = {
	examinationTimetable: examinationTimetableTranslation_EN
};
const i18n = mockI18n(examinationTimetableTranslations);

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('controllers/projects/examination-timetable/utils/events/get-events', () => {
	describe('#getEvents', () => {
		describe('When getting the events for the examination timetable page', () => {
			let result;
			const datePresent = '2023-01-02';
			const dateUpcoming = '2023-01-03';
			const datePast = '2023-01-01';
			const mockAppData = {
				CaseReference: 'mock case reference',
				dateOfNonAcceptance: '2023-01-01'
			};

			beforeEach(async () => {
				jest.useFakeTimers().setSystemTime(new Date(datePresent));
				getTimetables.mockResolvedValue({
					data: {
						timetables: [
							{
								dateOfEvent: datePast,
								description: '<p>mock description 1</p>',
								title: 'mock title 1',
								uniqueId: 'mock id 1',
								typeOfEvent: 'mock event type 1'
							},
							{
								dateOfEvent: dateUpcoming,
								description: '<p>mock description 2</p>',
								title: 'mock title 2',
								uniqueId: 'mock id 2',
								typeOfEvent: 'mock event type 2'
							}
						]
					}
				});
				result = await getEvents(mockAppData, i18n);
			});

			it('should return the events formatted to the view model', () => {
				expect(result).toEqual({
					hasOpenTimetables: false,
					past: {
						displayEvents: true,
						events: [
							{
								description: '<p>mock description 1</p>',
								eventTitle: 'mock title 1',
								id: 'mock id 1',
								inputId: 'project-examination-timetable',
								state: {
									isSubmissionOpen: false,
									tag: {
										classes: '',
										text: 'Closed'
									}
								},
								title: '1 January 2023 - mock title 1',
								typeOfEvent: 'mock event type 1'
							}
						],
						noEventsHtml: '<p>There are no deadlines and events</p>',
						title: 'Past deadlines and events'
					},
					upcoming: {
						displayEvents: true,
						events: [
							{
								description: '<p>mock description 2</p>',
								eventTitle: 'mock title 2',
								id: 'mock id 2',
								inputId: 'project-examination-timetable',
								state: { isSubmissionOpen: false, tag: null },
								title: '3 January 2023 - mock title 2',
								typeOfEvent: 'mock event type 2'
							}
						],
						noEventsHtml: '<p>There are no deadlines and events</p>',
						title: 'Upcoming deadlines and events'
					}
				});
			});
		});
	});
});
