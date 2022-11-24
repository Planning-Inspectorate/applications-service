const {
	getSelectDeadline,
	postSelectDeadline
} = require('../../../../../src/controllers/examination/select-deadline/controller');

const {
	setActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');
const {
	findDeadlineItemByValue
} = require('../../../../../src/controllers/examination/session/deadlineItems-session');
const {
	getPageData
} = require('../../../../../src/controllers/examination/select-deadline/utils/get-page-data');
const {
	handleEditModeSubmissionItemId
} = require('../../../../../src/controllers/examination/select-deadline/utils/handle-edit-mode-submission-item-id');
const {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/select-deadline/utils/get-redirect-url');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	setActiveSubmissionItem: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/session/deadlineItems-session', () => ({
	findDeadlineItemByValue: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/select-deadline/utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock(
	'../../../../../src/controllers/examination/select-deadline/utils/handle-edit-mode-submission-item-id',
	() => ({
		handleEditModeSubmissionItemId: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/select-deadline/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

const mockPageDataValue = { page: 'data' };

describe('controllers/examination/select-deadline/controller', () => {
	describe('#getSelectDeadline', () => {
		describe('When rendering the select a deadline page', () => {
			const req = {
				query: {
					mockQuery: 'mock query'
				},
				session: {
					mockSession: 'mock session'
				}
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};

			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					getSelectDeadline(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.query, req.session);
				});
				it('should render the selected deadline as checked', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/select-deadline',
						mockPageDataValue
					);
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
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
				body: {
					mockBody: 'mock body'
				},
				query: {
					mockQuery: 'mock query'
				},
				session: {
					mockSession: 'mock session'
				}
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
					getPageData.mockReturnValue(mockPageDataValue);
					postSelectDeadline(mockReq, res);
				});

				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(req.query, req.session);
				});

				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', {
						...mockPageDataValue,
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
				const mockRedirectUrl = 'mock redirect url';

				beforeEach(() => {
					findDeadlineItemByValue.mockReturnValue(mockFoundDeadlineItem);
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postSelectDeadline(mockReq, res);
				});

				it('should call the functions', () => {
					expect(findDeadlineItemByValue).toHaveBeenCalledWith(
						mockReq.session,
						mockBodyDeadlineItem
					);
					expect(setActiveSubmissionItem).toHaveBeenCalledWith(
						mockReq.session,
						mockFoundDeadlineItem
					);
					expect(handleEditModeSubmissionItemId).toHaveBeenCalledWith(
						mockReq.query,
						mockReq.session,
						mockFoundDeadlineItem.value
					);
					expect(getRedirectUrl).toHaveBeenCalledWith(mockReq.query);
				});

				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
		});
	});
});
