const {
	getUploadedFilesFromSession
} = require('../../../../../../src/controllers/examination/file-upload/fileSessionManagement');

const {
	postRenderView
} = require('../../../../../../src/controllers/examination/select-file/utils/render-view');

const {
	continueHandler
} = require('../../../../../../src/controllers/examination/select-file/utils/continue-handler');
const {
	mapErrorMessage
} = require('../../../../../../src/controllers/examination/select-file/utils/helpers');
const {
	noFileSelected
} = require('../../../../../../src/controllers/examination/select-file/utils/errors/fileValidation');

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
			beforeEach(() => {
				getUploadedFilesFromSession.mockReturnValue('uploaded files');
				noFileSelected.mockReturnValue('');
				continueHandler(req, res);
			});
			it('should then redirect to the next page', () => {
				expect(res.redirect).toHaveBeenCalledWith(
					'/examination/files-have-personal-information-or-not'
				);
			});
		});
	});
});
