const {
	getSelectIfYouWantToDeleteData,
	postMarkDeadlineItemForDelete,
	postSelectIfYouWantToDeleteData
} = require('../../../../../src/controllers/examination/select-if-want-to-delete-data/controller');
const {
	setDeadlineItemToDelete,
	getDeadlineItemToDelete
} = require('../../../../../src/controllers/examination/session/deadlineItems-session');
const {
	deleteSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../src/controllers/examination/session/deadlineItems-session', () => ({
	setDeadlineItemToDelete: jest.fn(),
	getDeadlineItemToDelete: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	deleteSubmissionItem: jest.fn()
}));

describe("controllers/examination/select-if-want-to-delete-data/controller'", () => {
	describe('#getSelectIfYouWantToDeleteData', () => {
		const req = {};
		const res = {
			render: jest.fn(),
			status: jest.fn(() => req)
		};
		describe('When getting the select if you want to delete data', () => {
			describe('and the page renders', () => {
				beforeEach(() => {
					getSelectIfYouWantToDeleteData(req, res);
				});
				it('should render the page with the correct page data', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/select-if-want-to-delete-data',
						{
							backLinkUrl: '/examination/add-another-deadline-item',
							id: 'examination-select-if-want-to-delete-data',
							options: [
								{
									text: 'Yes',
									value: 'yes'
								},
								{
									text: 'No',
									value: 'no'
								}
							],
							pageTitle: 'Are you sure you want to delete data for this item?'
						}
					);
				});
			});
		});
	});

	describe('#postMarkDeadlineItemForDelete', () => {
		const mockSession = 'mock session';
		const req = { session: mockSession, body: { itemIdToDelete: 'mock item' } };
		const res = {
			render: jest.fn(),
			redirect: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When adding the delete deadline itemId to session', () => {
			describe('and it is successful', () => {
				beforeEach(() => {
					setDeadlineItemToDelete.mockReturnValue();
					postMarkDeadlineItemForDelete(req, res);
				});
				it('should call the deadline item delete function', () => {
					expect(setDeadlineItemToDelete).toHaveBeenCalledWith('mock session', 'mock item');
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/select-if-want-to-delete-data');
				});
			});
			describe('and it fails', () => {
				beforeEach(() => {
					setDeadlineItemToDelete.mockImplementation(() => {
						throw new Error('an error');
					});
					postMarkDeadlineItemForDelete(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postSelectIfYouWantToDeleteData', () => {
		describe('When posting to select if you want to delete data', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has not selected and option', () => {
				const mockSession = 'mock session';
				const req = {
					session: mockSession,
					body: { 'examination-select-if-want-to-delete-data': 'mock item' }
				};
				beforeEach(() => {
					req.body = {
						errors: 'mock error',
						errorSummary: 'mock error summary'
					};
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/select-if-want-to-delete-data',
						{
							backLinkUrl: '/examination/add-another-deadline-item',
							errorSummary: 'mock error summary',
							errors: 'mock error',
							id: 'examination-select-if-want-to-delete-data',
							options: [
								{
									text: 'Yes',
									value: 'yes'
								},
								{
									text: 'No',
									value: 'no'
								}
							],
							pageTitle: 'Are you sure you want to delete data for this item?'
						}
					);
				});
			});
			describe('and there is an error', () => {
				const mockSession = 'mock session';
				const req = {
					session: mockSession,
					body: { 'examination-select-if-want-to-delete-data': 'mock item' }
				};
				beforeEach(() => {
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and the option chosen was yes', () => {
				const mockSession = 'mock session';
				const req = {
					session: mockSession,
					body: { 'examination-select-if-want-to-delete-data': 'yes' }
				};
				const mockItemToDelete = 'item to delete';
				beforeEach(() => {
					getDeadlineItemToDelete.mockReturnValue(mockItemToDelete);
					deleteSubmissionItem.mockReturnValue();
					setDeadlineItemToDelete.mockReturnValue();
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should call the function', () => {
					expect(getDeadlineItemToDelete).toHaveBeenCalledWith(mockSession);
					expect(deleteSubmissionItem).toHaveBeenCalledWith(mockSession, mockItemToDelete);
					expect(setDeadlineItemToDelete).toHaveBeenCalledWith(mockSession, -1);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/add-another-deadline-item');
				});
			});
			describe('and the option chosen was no', () => {
				const mockSession = 'mock session';
				const req = {
					session: mockSession,
					body: { 'examination-select-if-want-to-delete-data': 'no' }
				};
				const mockItemToDelete = 'item to delete';
				beforeEach(() => {
					getDeadlineItemToDelete.mockReturnValue(mockItemToDelete);
					deleteSubmissionItem.mockReturnValue();
					setDeadlineItemToDelete.mockReturnValue();
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should call the function', () => {
					expect(getDeadlineItemToDelete).toHaveBeenCalledWith(mockSession);
					expect(deleteSubmissionItem).not.toHaveBeenCalledWith(mockSession, mockItemToDelete);
					expect(setDeadlineItemToDelete).toHaveBeenCalledWith(mockSession, -1);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/add-another-deadline-item');
				});
			});
		});
	});
});
