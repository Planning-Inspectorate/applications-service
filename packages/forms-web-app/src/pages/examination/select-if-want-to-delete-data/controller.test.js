const {
	getSelectIfYouWantToDeleteData,
	postMarkDeadlineItemForDelete,
	postSelectIfYouWantToDeleteData
} = require('./controller');

const { setDeadlineItemToDelete } = require('../_session/deadlineItems-session');
const { yesDeleteSubmissionItem } = require('./utils/yes-delete-submission-item');
const { mockI18n } = require('../../_mocks/i18n');
const commonTranslationsEN = require('../../../locales/en/common.json');

const i18n = mockI18n({ common: commonTranslationsEN });

jest.mock('../_session/deadlineItems-session', () => ({
	setDeadlineItemToDelete: jest.fn()
}));

jest.mock('./utils/yes-delete-submission-item', () => ({
	yesDeleteSubmissionItem: jest.fn()
}));

describe('examination/select-if-want-to-delete-data/controller', () => {
	describe('#getSelectIfYouWantToDeleteData', () => {
		const req = { i18n };
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
						'examination/select-if-want-to-delete-data/view.njk',
						{
							backLinkUrl: 'add-another-deadline-item',
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
							]
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
					expect(res.redirect).toHaveBeenCalledWith('select-if-want-to-delete-data');
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
					i18n,
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
						'examination/select-if-want-to-delete-data/view.njk',
						{
							backLinkUrl: 'add-another-deadline-item',
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
							]
						}
					);
				});
			});

			describe('and there is an error', () => {
				const mockSession = 'mock session';
				const req = {
					i18n,
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
				beforeEach(() => {
					setDeadlineItemToDelete.mockReturnValue();
					yesDeleteSubmissionItem.mockReturnValue();
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should call the function', () => {
					expect(yesDeleteSubmissionItem).toHaveBeenCalledWith(mockSession);
					expect(setDeadlineItemToDelete).toHaveBeenCalledWith(mockSession, -1);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('add-another-deadline-item');
				});
			});
			describe('and the option chosen was no', () => {
				const mockSession = 'mock session';
				const req = {
					session: mockSession,
					body: { 'examination-select-if-want-to-delete-data': 'no' }
				};
				beforeEach(() => {
					yesDeleteSubmissionItem.mockReturnValue();
					setDeadlineItemToDelete.mockReturnValue();
					postSelectIfYouWantToDeleteData(req, res);
				});
				it('should call the function', () => {
					expect(yesDeleteSubmissionItem).not.toHaveBeenCalled();
					expect(setDeadlineItemToDelete).toHaveBeenCalledWith(mockSession, -1);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('add-another-deadline-item');
				});
			});
		});
	});
});
