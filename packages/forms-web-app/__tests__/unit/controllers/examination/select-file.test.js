const {
	getSelectFile,
	postSelectFile
} = require('../../../../src/controllers/examination/select-file');
let {
	mapUploadedFilesToSummaryList,
	addHrefToErrorSummary,
	mapErrorMessage
} = require('../../../../src/controllers/examination/file-upload/utils');
let {
	getUploadedFilesFromSession
} = require('../../../../src/controllers/examination/file-upload/fileSessionManagement');
const {
	noFileSelected
} = require('../../../../src/controllers/examination/file-upload/fileValidation');
const {
	deleteHandler,
	uploadHandler
} = require('../../../../src/controllers/examination/file-upload/handlers');
const {
	getSelectedDeadlineItem
} = require('../../../../src/controllers/examination/utils/sessionHelpers');

const pageData = {
	backLinkUrl: '/examination/select-upload-evidence-or-comment',
	id: 'examination-select-file',
	pageTitle: 'Select a file',
	title: 'Select a file',
	captionTitle: 'Deadline item:',
	maxFileSizeInMb: 50
};

jest.mock('../../../../src/controllers/examination/file-upload/utils', () => ({
	mapUploadedFilesToSummaryList: jest.fn(),
	addHrefToErrorSummary: jest.fn(),
	mapErrorMessage: jest.fn()
}));
jest.mock('../../../../src/controllers/examination/file-upload/fileSessionManagement', () => ({
	getUploadedFilesFromSession: jest.fn()
}));
jest.mock('../../../../src/controllers/examination/file-upload/fileValidation', () => ({
	noFileSelected: jest.fn()
}));
jest.mock('../../../../src/controllers/examination/file-upload/handlers', () => ({
	deleteHandler: jest.fn(),
	uploadHandler: jest.fn()
}));

jest.mock('../../../../src/controllers/examination/utils/sessionHelpers', () => ({
	getSelectedDeadlineItem: jest.fn()
}));

describe('controllers/examination/submitting-for', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});
	describe('#getSelectFile', () => {
		describe('When get select file controller is called', () => {
			const req = { session: '' };
			const res = { render: jest.fn() };
			const mockFileSummaryList = 'mock file summary list';
			const mockDeadlineItem = 'mock deadline item';
			beforeEach(() => {
				mapUploadedFilesToSummaryList.mockReturnValue(mockFileSummaryList);
				getSelectedDeadlineItem.mockReturnValue(mockDeadlineItem);
				getSelectFile(req, res);
			});

			it('should then return render the view with the correct page data and session files', () => {
				expect(res.render).toHaveBeenCalledWith('pages/examination/select-file', {
					...pageData,
					selectedDeadlineItemTitle: mockDeadlineItem,
					uploadedFiles: mockFileSummaryList
				});
			});
		});
	});
	describe('#postSelectFile', () => {
		describe('When a post is called', () => {
			describe('and the body contains continue', () => {
				describe('and there are files saved', () => {
					const req = { session: 'session data', body: { continue: 'true' } };
					const res = { redirect: jest.fn() };
					beforeEach(() => {
						getUploadedFilesFromSession.mockReturnValue();
						noFileSelected.mockReturnValue();
						postSelectFile(req, res);
					});

					it('should then redirect to the next page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/examination/files-have-personal-information-or-not'
						);
					});
				});
				describe('and there are no files saved', () => {
					const req = { session: 'session data', body: { continue: 'true' } };
					const res = { render: jest.fn() };
					const error = 'mock no file error';
					const mockErrorSummary = error;
					const mockFileSummaryList = error;
					const mockDeadlineItem = 'mock deadline item';
					beforeEach(() => {
						mapUploadedFilesToSummaryList.mockReturnValue(mockFileSummaryList);
						addHrefToErrorSummary.mockReturnValue(mockErrorSummary);
						getUploadedFilesFromSession.mockReturnValue();
						noFileSelected.mockReturnValue(error);
						getSelectedDeadlineItem.mockReturnValue(mockDeadlineItem);
						mapErrorMessage.mockReturnValue({ errorMessage: error, errorSummary: [error] });
						postSelectFile(req, res);
					});

					it('should then redirect to the next page', () => {
						expect(res.render).toHaveBeenCalledWith('pages/examination/select-file', {
							...pageData,
							selectedDeadlineItemTitle: mockDeadlineItem,
							uploadedFiles: mockFileSummaryList,
							errorMessage: error,
							errorSummary: mockErrorSummary,
							isJsEnabled: false
						});
					});
				});
			});
			describe('and the body contains delete', () => {
				const req = { session: 'session data', body: { delete: 'true' } };
				const res = { redirect: jest.fn() };
				beforeEach(() => {
					deleteHandler.mockResolvedValue();
					postSelectFile(req, res);
				});

				it('should then redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/select-a-file');
				});
			});
			describe('and the body contains upload', () => {
				const req = { session: 'session data', body: { upload: 'true' } };
				const res = { render: jest.fn() };
				const error = {
					errorSummary: [{ text: 'i am an error' }],
					errorMessage: 'i am an error'
				};
				const mockErrorSummary = 'mock error summary';
				const mockFileSummaryList = 'mock file summary list';
				beforeEach(() => {
					mapUploadedFilesToSummaryList.mockReturnValue(mockFileSummaryList);
					addHrefToErrorSummary.mockReturnValue(mockErrorSummary);
					uploadHandler.mockResolvedValue(error);
					postSelectFile(req, res);
				});

				it('should then redirect to the next page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/select-file', {
						...pageData,
						uploadedFiles: mockFileSummaryList,
						errorMessage: error.errorMessage,
						errorSummary: mockErrorSummary,
						isJsEnabled: false
					});
				});
			});
		});
	});
});
