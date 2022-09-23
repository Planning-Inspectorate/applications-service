const {
	getExaminationTimetable,
	postExaminationTimetable
} = require('../../../../src/controllers/projects/examination-timetable');
const { mockReq, mockRes, mockResponse } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

const expectNotFound = (res) => {
	expect(res.render).toHaveBeenCalledWith('error/not-found');
	expect(res.status).toHaveBeenLastCalledWith(404);
};

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
					DateTimeExaminationEnds: '2022-09-08T00:00:00.000Z'
				}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('examination-timetable controllers', () => {
		it('should call the correct template', async () => {
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
