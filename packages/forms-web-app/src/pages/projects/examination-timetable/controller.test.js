const {
	getProjectsExaminationTimetableController,
	postProjectsExaminationTimetableController
} = require('./controller');

const { getProjectData } = require('../../../lib/application-api-wrapper');
const { getTimetables } = require('../../../lib/application-api-wrapper');
const { mockI18n } = require('../../_mocks/i18n');

const examinationTimetableTranslation_EN = require('./_translations/en.json');
const globalTranslation_EN = require('../../../locales/en/global.json');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getProjectData: jest.fn(),
	getTimetables: jest.fn()
}));

const examinationTimetableTranslations = {
	global: globalTranslation_EN,
	examinationTimetable: examinationTimetableTranslation_EN
};

describe('pages/projects/examination-timetable/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date('2023-01-02'));
	});

	describe('#getProjectsExaminationTimetableController', () => {
		beforeEach(() => {
			req = {
				params: {
					case_ref: 'mock case ref'
				},
				session: {},
				i18n: mockI18n(examinationTimetableTranslations)
			};
			res = {
				status: jest.fn(() => res),
				render: jest.fn(),
				locals: {
					applicationData: {
						projectName: 'mock project name'
					}
				}
			};
		});
		describe('When getting the examination table page', () => {
			describe('and there are no issues', () => {
				beforeEach(async () => {
					getProjectData.mockResolvedValue({
						data: {
							CaseReference: 'mock_case_ref',
							ConfirmedStartOfExamination: '2023-01-01',
							DateTimeExaminationEnds: '2023-01-03',
							dateOfNonAcceptance: '2023-01-01',
							ProjectName: 'mock project name',
							PromoterName: 'mock promoter name'
						}
					});

					getTimetables.mockResolvedValue({
						data: {
							timetables: [
								{
									dateOfEvent: '2023-01-01',
									description: 'mock description 1 \r\n * mock item 1',
									title: 'mock title 1',
									uniqueId: 'mock id 1',
									typeOfEvent: 'mock event type 1'
								},
								{
									dateOfEvent: '2023-01-01',
									description: 'mock description 2 \r\n * mock item 2',
									title: 'mock title 2',
									uniqueId: 'mock id 2',
									typeOfEvent: 'Deadline'
								},
								{
									dateOfEvent: '2023-01-03',
									description: 'mock description 3 \r\n * mock item 3',
									title: 'mock title 3',
									uniqueId: 'mock id 3',
									typeOfEvent: 'mock event type 3'
								},
								{
									dateOfEvent: '2023-01-03',
									dateTimeDeadlineStart: '2023-01-02',
									description: 'mock description 4 \r\n * mock item 4',
									title: 'mock title 4',
									uniqueId: 'mock id 4',
									typeOfEvent: 'Deadline'
								}
							]
						}
					});

					await getProjectsExaminationTimetableController(req, res);
				});
				it('should call the correct template with the page data', async () => {
					expect(res.render).toHaveBeenCalledWith('projects/examination-timetable/view.njk', {
						activeProjectLink: 'project-examination-timetable',
						caseRef: 'mock case ref',
						events: {
							hasOpenTimetables: true,
							past: {
								displayEvents: true,
								events: [
									{
										description: '<p>mock description 1 </p>\n<ul>\n<li>mock item 1</li>\n</ul>\n',
										eventTitle: 'mock title 1',
										id: 'mock id 1',
										inputId: 'project-examination-timetable',
										state: {
											isSubmissionOpen: false,
											tag: {
												classes: 'govuk-tag govuk-tag--blue',
												text: 'Closed'
											}
										},
										title: '1 January 2023 - mock title 1',
										typeOfEvent: 'mock event type 1'
									},
									{
										description: '<p>mock description 2 </p>\n<ul>\n<li>mock item 2</li>\n</ul>\n',
										eventTitle: 'mock title 2',
										id: 'mock id 2',
										inputId: 'project-examination-timetable',
										state: {
											isSubmissionOpen: false,
											tag: {
												classes: 'govuk-tag govuk-tag--blue',
												text: 'Closed'
											}
										},
										title: '1 January 2023 - mock title 2',
										typeOfEvent: 'Deadline'
									}
								],
								noEventsHtml: '<p>There are no deadlines and events</p>',
								title: 'Past deadlines and events'
							},
							upcoming: {
								displayEvents: true,
								events: [
									{
										description: '<p>mock description 3 </p>\n<ul>\n<li>mock item 3</li>\n</ul>\n',
										eventTitle: 'mock title 3',
										id: 'mock id 3',
										inputId: 'project-examination-timetable',
										state: {
											isSubmissionOpen: false,
											tag: null
										},
										title: '3 January 2023 - mock title 3',
										typeOfEvent: 'mock event type 3'
									},
									{
										description: '<p>mock description 4 </p>\n<ul>\n<li>mock item 4</li>\n</ul>\n',
										eventTitle: 'mock title 4',
										id: 'mock id 4',
										inputId: 'project-examination-timetable',
										state: {
											isSubmissionOpen: true,
											tag: {
												classes: 'govuk-tag govuk-tag--yellow',
												text: 'Open'
											}
										},
										title: '3 January 2023 - mock title 4',
										typeOfEvent: 'Deadline'
									}
								],
								noEventsHtml: '<p>There are no deadlines and events</p>',
								title: 'Upcoming deadlines and events'
							}
						},
						examination: {
							closeDate: '',
							startDate: 'The examination opened on 1 January 2023'
						},
						pageTitle:
							'Examination timetable - mock project name - Find a National Infrastructure Project',
						title: 'mock project name'
					});
				});
			});
			describe('and there is an issue', () => {
				beforeEach(async () => {
					getProjectData.mockResolvedValue(() => {
						throw new Error('something went wrong');
					});
					await getProjectsExaminationTimetableController(req, res);
				});
				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
					expect(res.status).toHaveBeenLastCalledWith(500);
				});
			});
		});
	});

	describe('#postProjectsExaminationTimetableController', () => {
		const req = {
			params: {
				case_ref: 'mock case ref'
			},
			body: {},
			session: {}
		};
		const res = {
			redirect: jest.fn()
		};
		const next = jest.fn();
		describe('When a timetable id is present', () => {
			beforeEach(() => {
				req.body = { 'project-examination-timetable': 'mock-id' };
				postProjectsExaminationTimetableController(req, res);
			});

			it('should set the id in the session', () => {
				expect(req.session).toEqual({
					examination: {
						examinationTimetableId: 'mock-id'
					}
				});
			});
			it('should redirect to the have your say journey', () => {
				expect(res.redirect).toHaveBeenCalledWith('examination/have-your-say-during-examination');
			});
		});
		describe('When a timetable id is NOT present', () => {
			beforeEach(() => {
				req.body = {};
				postProjectsExaminationTimetableController(req, res, next);
			});
			it('should redirect to the have your say journey', () => {
				expect(next).toHaveBeenCalledWith(new Error('NO_EXAM_TIMETABLE_ID'));
			});
		});
	});
});
