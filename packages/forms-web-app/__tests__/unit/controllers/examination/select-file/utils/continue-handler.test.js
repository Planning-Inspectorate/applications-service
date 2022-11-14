const {
	continueHandler
} = require('../../../../../../src/controllers/examination/select-file/utils/continue-handler');

let {
	getUploadedFilesFromSession
} = require('../../../../../../src/controllers/examination/file-upload/fileSessionManagement');
let {
	postRenderView
} = require('../../../../../../src/controllers/examination/select-file/utils/render-view');
let {
	mapErrorMessage
} = require('../../../../../../src/controllers/examination/select-file/utils/helpers');
let {
	noFileSelected
} = require('../../../../../../src/controllers/examination/select-file/utils/errors/fileValidation');
let {
	getRedirectRoute
} = require('../../../../../../src/controllers/examination/select-file/utils/get-redirect-route');
let {
	getSubmissionItemPageUrl
} = require('../../../../../../src/controllers/examination/utils/get-submission-item-page-url');

jest.mock(
	'../../../../../../src/controllers/examination/file-upload/fileSessionManagement',
	() => ({
		getUploadedFilesFromSession: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/examination/select-file/utils/errors/fileValidation',
	() => ({
		noFileSelected: jest.fn()
	})
);
jest.mock('../../../../../../src/controllers/examination/select-file/utils/render-view', () => ({
	postRenderView: jest.fn()
}));
jest.mock('../../../../../../src/controllers/examination/select-file/utils/helpers', () => ({
	mapErrorMessage: jest.fn()
}));
jest.mock(
	'../../../../../../src/controllers/examination/select-file/utils/get-redirect-route',
	() => ({
		getRedirectRoute: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/examination/utils/get-submission-item-page-url',
	() => ({
		getSubmissionItemPageUrl: jest.fn()
	})
);

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
