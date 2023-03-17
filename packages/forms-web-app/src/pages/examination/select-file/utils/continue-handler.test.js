const { continueHandler } = require('./continue-handler');

let { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');
let { postRenderView } = require('./render-view');
let { mapErrorMessage } = require('./helpers');
let { noFileSelected } = require('./errors/fileValidation');
let { getRedirectRoute } = require('./get-redirect-route');
let { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');

jest.mock('../../_utils/file-upload/fileSessionManagement', () => ({
	getUploadedFilesFromSession: jest.fn()
}));
jest.mock('./errors/fileValidation', () => ({
	noFileSelected: jest.fn()
}));
jest.mock('./render-view', () => ({
	postRenderView: jest.fn()
}));
jest.mock('./helpers', () => ({
	mapErrorMessage: jest.fn()
}));
jest.mock('./get-redirect-route', () => ({
	getRedirectRoute: jest.fn()
}));
jest.mock('../../_utils/get-submission-item-page-url', () => ({
	getSubmissionItemPageUrl: jest.fn()
}));

describe('#continueHandler', () => {
	const res = { redirect: jest.fn() };
	const req = { session: 'session' };
	describe('When using the continue handler', () => {
		describe('And there is no files in session', () => {
			beforeEach(() => {
				getUploadedFilesFromSession.mockReturnValue('uploaded files');
				noFileSelected.mockReturnValue('no files in session');
				mapErrorMessage.mockReturnValue('mapped error message');
				continueHandler(req, res);
			});
			it('should then redirect to the next page', () => {
				expect(postRenderView).toHaveBeenCalledWith(req, res, req.session, 'mapped error message');
			});
		});
		describe('And there is is at least one file uploaded', () => {
			const mockedirectRoute = '/mock-url';
			beforeEach(() => {
				getRedirectRoute.mockReturnValue(mockedirectRoute);
				getUploadedFilesFromSession.mockReturnValue('uploaded files');
				noFileSelected.mockReturnValue('');
				getRedirectRoute.mockReturnValue();
				getSubmissionItemPageUrl.mockReturnValue(mockedirectRoute);
				continueHandler(req, res);
			});
			it('should then redirect to the next page', () => {
				expect(res.redirect).toHaveBeenCalledWith(mockedirectRoute);
			});
		});
	});
});
