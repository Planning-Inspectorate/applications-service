const moment = require('moment');
const {
	getExaminationTimetable,
	postExaminationTimetable
} = require('../../../../src/controllers/projects/examination-timetable');
const { getTimetables } = require('../../../../src/lib/application-api-wrapper');
const { formatDate } = require('../../../../src/utils/date-utils');
const { mockReq, mockRes, mockResponse } = require('../../mocks');
const { marked } = require('marked');
const { VIEW } = require('../../../../src/lib/views');

const expectNotFound = (res) => {
	expect(res.render).toHaveBeenCalledWith('error/not-found');
	expect(res.status).toHaveBeenLastCalledWith(404);
};

jest.mock('../../../../src/lib/application-api-wrapper');
jest.mock('../../../../src/services/representation.service');

describe('controllers/projects/examination-timetable', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				caseRef: 'ABCD1234',
				projectName: 'ABC',
				appData: {
					ConfirmedStartOfExamination: '2022-09-08',
					DateTimeExaminationEnds: '2022-09-08T00:00:00.000Z',
					dateOfNonAcceptance: moment()
				}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('examination-timetable controllers', () => {
		it('should call the correct template', async () => {
			getTimetables.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						timetables: []
					}
				})
			);

			await getExaminationTimetable(req, res);

			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.TIMETABLE, {
				activeProjectLink: 'project-examination-timetable',
				caseRef: 'ABCD1234',
				eventElementId: 'examination-timetable-event-',
				confirmedStartOfExamination: 'The examination opened on 8 September 2022',
				dateTimeExaminationEnds: 'The examination closed on 8 September 2022',
				events: [],
				nextDeadline: null,
				pageTitle: 'Examination timetable - ABC - National Infrastructure Planning',
				projectEmailSignUpUrl: '/projects/ABCD1234#project-section-email-sign-up',
				projectName: 'ABC',
				projectUrl: '/projects/ABCD1234',
				title: 'Examination timetable'
			});
		});

		it('should return not found without a session and param caseRef', async () => {
			req.session = {};

			res = mockResponse();

			await getExaminationTimetable(req, res);

			expectNotFound(res);
		});

		it('should set event data and eventSubmit button based on timetable data', async () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 4);

			getTimetables.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						timetables: [
							{
								id: 1,
								uniqueId: 'EN010009-4079',
								caseReference: 'EN010009',
								title: 'Deadline 1',
								description: 'Deadline 1 description',
								dateOfEvent: '2022-08-04T23:59:00.000Z',
								timetableType: 'Exams',
								typeOfEvent: 'Deadline',
								dateTimeDeadlineStart: '2022-07-26T00:00:00.000Z',
								sourceSystem: 'HORIZON'
							},
							{
								id: 2,
								uniqueId: 'EN010009-4069',
								caseReference: 'EN010009',
								title: 'Deadline 2',
								description: 'Deadline 2 description',
								dateOfEvent: futureDate.toISOString(),
								timetableType: 'Exams',
								typeOfEvent: 'Deadline',
								dateTimeDeadlineStart: '2022-09-26T00:00:00.000Z',
								sourceSystem: 'HORIZON'
							},
							{
								id: 3,
								uniqueId: 'EN010009-4089',
								caseReference: 'EN010009',
								title: 'Deadline 3',
								description: 'Deadline 3 description',
								dateOfEvent: futureDate.toISOString(),
								timetableType: 'Exams',
								typeOfEvent: 'Deadline',
								dateTimeDeadlineStart: '0001-01-01 00:00:00',
								sourceSystem: 'HORIZON'
							},
							{
								id: 4,
								uniqueId: 'EN010009-4089',
								caseReference: 'EN010009',
								title: 'Deadline 4',
								description: 'Deadline 4 description',
								dateOfEvent: futureDate.toISOString(),
								timetableType: 'Exams',
								typeOfEvent: 'Deadline',
								dateTimeDeadlineStart: '2023-01-12TT00:00:00.000Z',
								sourceSystem: 'HORIZON'
							}
						]
					}
				})
			);

			await getExaminationTimetable(req, res);

			const formattedDate = formatDate(futureDate.toISOString());

			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.TIMETABLE, {
				activeProjectLink: 'project-examination-timetable',
				caseRef: 'ABCD1234',
				eventElementId: 'examination-timetable-event-',
				confirmedStartOfExamination: 'The examination opened on 8 September 2022',
				dateTimeExaminationEnds: 'The examination closed on 8 September 2022',
				events: [
					{
						dateOfEvent: '4 August 2022',
						description: marked('Deadline 1 description'),
						elementId: 'examination-timetable-event-EN010009-4079',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 1',
						id: 'EN010009-4079',
						submitButton: false,
						eventState: { value: 'closed', text: 'Closed', classes: 'govuk-tag' },
						title: '4 August 2022 - Deadline 1',
						typeOfEvent: 'Deadline'
					},
					{
						dateOfEvent: formattedDate,
						description: marked('Deadline 2 description'),
						elementId: 'examination-timetable-event-EN010009-4069',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 2',
						id: 'EN010009-4069',
						submitButton: true,
						eventState: { value: 'open', text: 'Open', classes: 'govuk-tag--blue' },
						title: formattedDate + ' - Deadline 2',
						typeOfEvent: 'Deadline'
					},
					{
						dateOfEvent: formattedDate,
						description: marked('Deadline 3 description'),
						elementId: 'examination-timetable-event-EN010009-4089',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 3',
						id: 'EN010009-4089',
						submitButton: true,
						eventState: { value: 'open', text: 'Open', classes: 'govuk-tag--blue' },
						title: formattedDate + ' - Deadline 3',
						typeOfEvent: 'Deadline'
					},
					{
						dateOfEvent: formattedDate,
						description: marked('Deadline 4 description'),
						elementId: 'examination-timetable-event-EN010009-4089',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 4',
						id: 'EN010009-4089',
						submitButton: false,
						eventState: { value: 'null', text: '', classes: '' },
						title: formattedDate + ' - Deadline 4',
						typeOfEvent: 'Deadline'
					}
				],
				nextDeadline: {
					link: '#examination-timetable-event-EN010009-4069',
					title: 'Deadline 2 closes ' + formattedDate
				},
				pageTitle: 'Examination timetable - ABC - National Infrastructure Planning',
				projectEmailSignUpUrl: '/projects/ABCD1234#project-section-email-sign-up',
				projectName: 'ABC',
				projectUrl: '/projects/ABCD1234',
				title: 'Examination timetable'
			});
		});

		it('should return not found in case of missing session but wrong param caseRef', async () => {
			req.session = {};
			req.params = { case_ref: 'aa' };

			res = mockResponse();

			await getExaminationTimetable(req, res);

			expectNotFound(res);
		});

		it('should render a not found page for missing events', async () => {
			const req = {};
			req.session = {
				caseRef: '123ABC',
				allEvents: undefined
			};
			req.body = {};
			req.body['event-id'] = 'EN010011-0001';

			res = mockResponse();

			await postExaminationTimetable(req, res);

			expectNotFound(res);
		});

		it('should set the session storage values', async () => {
			const req = {};
			req.session = {
				caseRef: '123ABC',
				allEvents: [
					{
						closed: false,
						dateOfEvent: '18 January 2023',
						description:
							'<ul><li>Comments on submissions received for Deadline 2</li><li>Written summaries of oral submissions made at Hearings held during the w/c 26 September</li><li>Updated SoCG requested by the ExA</li></ul>',
						eventTitle: 'Test',
						id: 'EN010011-0001',
						eventIdFieldName: 'event-id',
						elementId: '17EN010011-0001',
						title: '18 January 2023 - Test'
					}
				]
			};
			req.body = {};
			req.body['event-id'] = 'EN010011-0001';

			res = mockResponse();

			await postExaminationTimetable(req, res);

			expect(res.redirect).toHaveBeenLastCalledWith(
				'/examination/have-your-say-during-examination'
			);

			expect(req.session.examination).toEqual({
				caseRef: '123ABC',
				deadlineItems: [
					{
						text: 'Comments on submissions received for Deadline 2',
						value: '0'
					},
					{
						text: 'Written summaries of oral submissions made at Hearings held during the w/c 26 September',
						value: '1'
					},
					{
						text: 'Updated SoCG requested by the ExA',
						value: '2'
					}
				],
				id: 'EN010011-0001',
				title: '18 January 2023 - Test'
			});
		});
	});
});
