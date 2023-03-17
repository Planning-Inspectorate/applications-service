const { getRenderView, postRenderView } = require('./render-view');
const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { mapUploadedFilesToSummaryList, addHrefToErrorSummary } = require('./helpers');
jest.mock('../../_utils/file-upload/fileSessionManagement', () => ({
	getUploadedFilesFromSession: jest.fn()
}));
jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));

jest.mock('./helpers', () => ({
	addHrefToErrorSummary: jest.fn(),
	mapUploadedFilesToSummaryList: jest.fn()
}));

describe('Rendering Views for ', () => {
	describe('#getRenderView', () => {
		const req = {};
		const res = { render: jest.fn() };
		describe('When rendering a view for a get select file', () => {
			describe('and the use is only uploading files', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({ submissionItem: 'mock submission item' });
					mapUploadedFilesToSummaryList.mockReturnValue('mapped list');
					getRenderView(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/select-file/view.njk', {
						activeSubmissionItemTitle: 'mock submission item',
						backLinkUrl: '/examination/select-upload-evidence-or-comment',
						id: 'examination-select-file',
						maxFileSizeInMb: 50,
						pageTitle: 'Select a file',
						title: 'Select a file',
						uploadedFiles: 'mapped list'
					});
				});
			});
			describe('and the user has made a comment and is uploading files', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({
						submissionItem: 'mock submission item',
						submissionType: 'both'
					});
					mapUploadedFilesToSummaryList.mockReturnValue('mapped list');
					getRenderView(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/select-file/view.njk', {
						activeSubmissionItemTitle: 'mock submission item',
						backLinkUrl: '/examination/enter-a-comment',
						id: 'examination-select-file',
						maxFileSizeInMb: 50,
						pageTitle: 'Select a file',
						title: 'Select a file',
						uploadedFiles: 'mapped list'
					});
				});
			});
		});
	});
	describe('#postRenderView', () => {
		const req = { body: {} };
		const res = { render: jest.fn() };
		const error = {
			errorMessage: 'mock error',
			errorSummary: 'mock error summary'
		};
		describe('When rendering the page on a post for select a file', () => {
			describe('and the page has js enable', () => {
				beforeEach(() => {
					req.body.isJsEnabled = true;
					getActiveSubmissionItem.mockReturnValue({ submissionItem: 'mock submission item' });
					addHrefToErrorSummary.mockReturnValue('mocked href summary');
					mapUploadedFilesToSummaryList.mockReturnValue('mock map uploaded summary list');
					postRenderView(req, res, req.session, error);
				});

				it('should set the href the JS id', () => {
					expect(addHrefToErrorSummary).toHaveBeenCalledWith('mock error summary', '#file-upload');
				});
				it('should render the page with the correct data', () => {
					expect(res.render).toHaveBeenCalledWith('examination/select-file/view.njk', {
						activeSubmissionItemTitle: 'mock submission item',
						backLinkUrl: '/examination/select-upload-evidence-or-comment',
						errorMessage: 'mock error',
						errorSummary: 'mocked href summary',
						id: 'examination-select-file',
						isJsEnabled: true,
						maxFileSizeInMb: 50,
						pageTitle: 'Select a file',
						title: 'Select a file',
						uploadedFiles: 'mock map uploaded summary list'
					});
				});
			});
			describe('and the page does not have js enable', () => {
				beforeEach(() => {
					delete req.body.isJsEnabled;
					getActiveSubmissionItem.mockReturnValue({ submissionItem: 'mock submission item' });
					addHrefToErrorSummary.mockReturnValue('mocked href summary');
					mapUploadedFilesToSummaryList.mockReturnValue('mock map uploaded summary list');
					postRenderView(req, res, req.session, error);
				});
				it('should set the href to the no JS id', () => {
					expect(addHrefToErrorSummary).toHaveBeenCalledWith(
						'mock error summary',
						'#examination-select-file'
					);
				});
				it('should render the page with the correct data', () => {
					expect(res.render).toHaveBeenCalledWith('examination/select-file/view.njk', {
						activeSubmissionItemTitle: 'mock submission item',
						backLinkUrl: '/examination/select-upload-evidence-or-comment',
						errorMessage: 'mock error',
						errorSummary: 'mocked href summary',
						id: 'examination-select-file',
						isJsEnabled: false,
						maxFileSizeInMb: 50,
						pageTitle: 'Select a file',
						title: 'Select a file',
						uploadedFiles: 'mock map uploaded summary list'
					});
				});
			});
		});
	});
});
