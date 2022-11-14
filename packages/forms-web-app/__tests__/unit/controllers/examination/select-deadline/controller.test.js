let {
	getActiveSubmissionItemKey,
	setSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');

let {
	getDeadlineItemStillToSubmit,
	findDeadlineItemByValue
} = require('../../../../../src/controllers/examination/session/deadlineItems-session');
let {
	markActiveDeadlineItemAsChecked
} = require('../../../../../src/controllers/examination/select-deadline/utils/markActiveDeadlineItemAsChecked');

const {
	getSelectDeadline,
	postSelectDeadline
} = require('../../../../../src/controllers/examination/select-deadline/controller');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItemKey: jest.fn(),
	setSubmissionItem: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/session/deadlineItems-session', () => ({
	getDeadlineItemStillToSubmit: jest.fn(),
	findDeadlineItemByValue: jest.fn()
}));

jest.mock(
	'../../../../../src/controllers/examination/select-deadline/utils/markActiveDeadlineItemAsChecked',
	() => ({
		markActiveDeadlineItemAsChecked: jest.fn()
	})
);

const pageData = {
	backLinkUrl: '/examination/your-email-address',
	hintText:
		'Select the item you want to submit against. You can submit against another item later.',
	id: 'examination-select-deadline',
	options: 'mock deadline items array',
	pageTitle: 'Which item would you like to submit against for this deadline?',
	title: 'Which item would you like to submit against for this deadline?'
};

const mockActiveSubmissionKey = 'mock submission key';
const mockDeadlineItems = 'mock deadline items array';
const mockDeadlineItemsWithChecked = 'mock deadline items array with a checked value';

describe('controllers/examination/select-deadline/controller', () => {
	describe('#getSelectDeadline', () => {
		describe('When rendering the select a deadline page', () => {
			const mockSession = 'mock session';
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				session: mockSession
			};

			describe('and the render is successful', () => {
				describe('and there is an active deadline selected', () => {
					beforeEach(() => {
						getActiveSubmissionItemKey.mockReturnValue(mockActiveSubmissionKey);
						getDeadlineItemStillToSubmit.mockReturnValue(mockDeadlineItems);
						markActiveDeadlineItemAsChecked.mockReturnValue(mockDeadlineItemsWithChecked);
						getSelectDeadline(req, res);
					});
					it('should call the functions', () => {
						expect(getDeadlineItemStillToSubmit).toHaveBeenCalledWith(mockSession);
						expect(getActiveSubmissionItemKey).toHaveBeenCalledWith(mockSession);
						expect(markActiveDeadlineItemAsChecked).toHaveBeenCalledWith(
							mockDeadlineItems,
							mockActiveSubmissionKey
						);
					});
					it('should render the selected deadline as checked', () => {
						expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', {
							backLinkUrl: '/examination/your-email-address',
							hintText:
								'Select the item you want to submit against. You can submit against another item later.',
							id: 'examination-select-deadline',
							options: mockDeadlineItemsWithChecked,
							pageTitle: 'Which item would you like to submit against for this deadline?',
							title: 'Which item would you like to submit against for this deadline?'
						});
					});
				});
				describe('and there is no deadline selected already', () => {
					beforeEach(() => {
						getActiveSubmissionItemKey.mockReturnValue();
						getDeadlineItemStillToSubmit.mockReturnValue(mockDeadlineItems);
						markActiveDeadlineItemAsChecked.mockReturnValue(mockDeadlineItemsWithChecked);
						getSelectDeadline(req, res);
					});
					it('should call the functions', () => {
						expect(getActiveSubmissionItemKey).toHaveBeenCalledWith(mockSession);
						expect(getDeadlineItemStillToSubmit).toHaveBeenCalledWith(mockSession);
						expect(markActiveDeadlineItemAsChecked).not.toHaveBeenCalled();
					});
					it('should render the page without any checked deadlines', () => {
						expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', {
							backLinkUrl: '/examination/your-email-address',
							hintText:
								'Select the item you want to submit against. You can submit against another item later.',
							id: 'examination-select-deadline',
							options: mockDeadlineItems,
							pageTitle: 'Which item would you like to submit against for this deadline?',
							title: 'Which item would you like to submit against for this deadline?'
						});
					});
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					getActiveSubmissionItemKey.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getSelectDeadline(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postSelectDeadline', () => {
		describe('When handling a selected deadline post', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				body: {},
				query: {},
				session: {}
			};

			describe('and there is an error', () => {
				const error = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				const mockReq = {
					...req,
					body: error
				};

				beforeEach(() => {
					postSelectDeadline(mockReq, res);
				});

				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', {
						...pageData,
						...error
					});
				});
			});

			describe('and there is no selected deadline in the body', () => {
				beforeEach(() => {
					postSelectDeadline(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there are no issues', () => {
				const mockFoundDeadlineItem = { value: 'mock value', text: 'mock text' };
				const mockBodyDeadlineItem = 'mock selected deadline item';
				const mockReq = {
					...req,
					body: {
						'examination-select-deadline': mockBodyDeadlineItem
					}
				};
				beforeEach(() => {
					findDeadlineItemByValue.mockReturnValue(mockFoundDeadlineItem);
					getActiveSubmissionItemKey.mockReturnValue();
					setSubmissionItem.mockReturnValue();
				});

				describe('and the query mode is NOT equal to "edit"', () => {
					beforeEach(() => {
						postSelectDeadline(mockReq, res);
					});
					it('should call the functions', () => {
						expect(findDeadlineItemByValue).toHaveBeenCalledWith(
							mockReq.session,
							mockBodyDeadlineItem
						);
						expect(setSubmissionItem).toHaveBeenCalledWith(mockReq.session, mockFoundDeadlineItem);
					});
					it('should redirect to the next page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/examination/select-upload-evidence-or-comment'
						);
					});
				});
				describe('and the query mode is equal to "edit"', () => {
					beforeEach(() => {
						mockReq.query.mode = 'edit';
					});
					describe('and the same selected deadline item is already in the session', () => {
						beforeEach(() => {
							getActiveSubmissionItemKey.mockReturnValue(mockFoundDeadlineItem.value);
							postSelectDeadline(mockReq, res);
						});
						it('should call the functions', () => {
							expect(findDeadlineItemByValue).toHaveBeenCalledWith(
								mockReq.session,
								mockBodyDeadlineItem
							);
							expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
						});
					});
				});
			});
		});
	});
});
