const { getChooseDeadline, postChooseDeadline } = require('./controller');

const { getTimetables } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

const { datePresent, timetables } = require('./__mocks__/fixtures');

describe('pages/examination/choose-deadline/controller', () => {
	describe('#getChooseDeadline', () => {
		beforeEach(() => {
			jest.useFakeTimers().setSystemTime(new Date(datePresent));
		});
		describe('When getting the choose deadline page', () => {
			describe('and there are no errors', () => {
				const req = {
					session: {
						caseRef: 'mock case ref',
						examination: { mock: 'examination' }
					}
				};
				const res = { render: jest.fn() };
				const next = jest.fn();

				beforeEach(async () => {
					getTimetables.mockResolvedValue(timetables);
					await getChooseDeadline(req, res, next);
				});

				it('should add the timetables to the examination session timetables key', () => {
					expect(req.session.examination.timetables).toEqual(timetables.data.timetables);
				});

				it('should call the choose deadline view with the correct page data', () => {
					expect(res.render).toBeCalledWith('examination/choose-deadline/view.njk', {
						backLinkUrl: 'your-email-address',
						id: 'choose-deadline',
						timetables: [
							{
								checked: false,
								items: ['mock timetable item 1', 'mock timetable item 2', 'mock timetable item 3'],
								title: 'mock title 1 closes on 3 January 2022',
								value: 'mock uid 1'
							}
						]
					});
				});
			});

			describe('and there is an error', () => {
				const req = {
					session: {
						caseRef: 'mock case ref',
						examination: { mock: 'examination' }
					}
				};
				const res = { render: jest.fn(), status: jest.fn(() => res) };
				const next = jest.fn();
				beforeEach(async () => {
					getTimetables.mockRejectedValue(new Error('something went wrong'));
					await getChooseDeadline(req, res, next);
				});

				it('should render the error page', () => {
					expect(next).toHaveBeenCalledWith(new TypeError('something went wrong'));
				});
			});
		});
	});

	describe('#postChooseDeadline', () => {
		describe('and the page has errors', () => {
			const req = {
				body: {
					errors: {
						'choose-deadline': 'mock error'
					},
					errorSummary: ['mock error summary']
				},
				session: {
					caseRef: 'mock case ref',
					examination: { mock: 'examination', timetables: [...timetables.data.timetables] }
				}
			};
			const res = { render: jest.fn() };
			const next = jest.fn();
			beforeEach(() => {
				postChooseDeadline(req, res, next);
			});
			it('should render the view with errors', () => {
				expect(res.render).toBeCalledWith('examination/choose-deadline/view.njk', {
					backLinkUrl: 'your-email-address',
					errorSummary: ['mock error summary'],
					errors: { 'choose-deadline': 'mock error' },
					id: 'choose-deadline',
					timetables: [
						{
							checked: false,
							items: ['mock timetable item 1', 'mock timetable item 2', 'mock timetable item 3'],
							title: 'mock title 1 closes on 3 January 2022',
							value: 'mock uid 1'
						}
					]
				});
			});
		});
		describe('and there are no errors', () => {
			const req = {
				body: {
					['choose-deadline']: 'mock uid 1',
					errors: {},
					errorSummary: []
				},
				session: {
					caseRef: 'mock case ref',
					examination: { mock: 'examination', timetables: [...timetables.data.timetables] }
				}
			};
			const res = { redirect: jest.fn(), render: jest.fn() };
			const next = jest.fn();

			beforeEach(() => {
				postChooseDeadline(req, res, next);
			});

			it('should redirect to the select deadline item url', () => {
				expect(res.redirect).toHaveBeenCalledWith('select-deadline-item');
			});

			it('should remove the timetables from the examination session and the selected timetable', () => {
				expect(req.session.examination).toEqual({
					deadlineItems: [
						{ text: 'mock timetable item 1', value: '0' },
						{ text: 'mock timetable item 2', value: '1' },
						{ text: 'mock timetable item 3', value: '2' }
					],
					examinationTimetableId: 'mock uid 1',
					mock: 'examination',
					timetables: null,
					title: 'mock title 1'
				});
			});
		});

		describe('and there is an error', () => {
			const req = {};
			const res = {};
			const next = jest.fn();

			beforeEach(() => {
				postChooseDeadline(req, res, next);
			});

			it('should render the error page', () => {
				expect(next).toHaveBeenCalledWith(
					new TypeError(`Cannot read properties of undefined (reading 'errors')`)
				);
			});
		});
	});
});
