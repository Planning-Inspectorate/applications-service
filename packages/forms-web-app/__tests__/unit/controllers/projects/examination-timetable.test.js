const {
	getExaminationTimetable,
	postExaminationTimetable
} = require('../../../../src/controllers/projects/examination-timetable');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/examination-timetable', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				caseRef: 'ABCD1234',
				projectName: 'ABC'
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	const mockResponse = () => {
		const res = {};
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);
		res.render = jest.fn().mockReturnValue(res);
		return res;
	};

	describe('examination-timetable controllers', () => {
		it('should call the correct template', async () => {
			await getExaminationTimetable(req, res);

			expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.TIMETABLE, {
				activeProjectLink: 'project-examination-timetable',
				caseRef: 'ABCD1234',
				eventElementId: 'examination-timetable-event-',
				events: [
					{
						closed: true,
						dateOfEvent: '19 August 2020',
						description:
							'Pre examination for the application by the end of the period of six months',
						elementId: 'examination-timetable-event-WS010006-34601',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 2',
						id: 'WS010006-34601',
						title: '19 August 2020 - Deadline 2'
					},
					{
						closed: false,
						dateOfEvent: '11 January 2023',
						description:
							'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
						elementId: 'examination-timetable-event-WS010006-34602',
						eventIdFieldName: 'event-id',
						eventTitle: 'Deadline 1A',
						id: 'WS010006-34602',
						title: '11 January 2023 - Deadline 1A'
					}
				],
				nextDeadline: {
					link: '#examination-timetable-event-WS010006-34602',
					title: 'Deadline 1A closes 11 January 2023'
				},
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

			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});

		it('should return unhandled exception in case of missing session but wrong param caseRef', async () => {
			req.session = {};
			req.params = { case_ref: 'aa' };

			res = mockResponse();

			await getExaminationTimetable(req, res);

			expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
		});

		it('should set the session storage values', async () => {
			const req = {};
			req.session = { caseRef: '123ABC' };
			req.body = {};
			req.body['event-id'] = 'WS010006-34602';
			res.redirect = () => {};

			await postExaminationTimetable(req, res);

			expect(req.session.examination).toEqual({
				caseRef: '123ABC',
				description:
					'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
				id: 2,
				title: 'Deadline 1A'
			});
		});
	});
});
