const { getSelectFile, postSelectFile } = require('./controller');

const { uploadHandler } = require('./utils/upload-handler');
const { getRenderView, postRenderView } = require('./utils/render-view');

const { continueHandler } = require('./utils/continue-handler');
const { deleteHandler } = require('./utils/delete-handler');

jest.mock('./utils/upload-handler', () => ({
	uploadHandler: jest.fn()
}));

jest.mock('./utils/delete-handler', () => ({
	deleteHandler: jest.fn()
}));

jest.mock('./utils/render-view', () => ({
	getRenderView: jest.fn(),
	postRenderView: jest.fn()
}));

jest.mock('./utils/continue-handler', () => ({
	continueHandler: jest.fn()
}));

describe('examination/submitting-for', () => {
	afterEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});
	describe('#getSelectFile', () => {
		describe('When get select file controller is called', () => {
			describe('and there are no errors', () => {
				const req = { session: '' };
				const res = {
					render: jest.fn()
				};
				beforeEach(() => {
					getRenderView.mockReturnValue('called');
					getSelectFile(req, res);
				});

				it('should then return render the view with the correct page data and session files', () => {
					expect(getRenderView).toHaveBeenCalledWith(req, res);
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
						continueHandler.mockReturnValue('continue handler called');
						postSelectFile(req, res);
					});

					it('should then redirect to the next page', () => {
						expect(continueHandler).toHaveBeenCalledWith(req, res);
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
					expect(res.redirect).toHaveBeenCalledWith('select-a-file');
				});
			});
			describe('and the body contains upload', () => {
				const req = { session: 'session data', body: { upload: 'true' } };
				const res = { render: jest.fn() };
				const error = {
					errorSummary: [{ text: 'i am an error' }],
					errorMessage: 'i am an error'
				};

				beforeEach(() => {
					uploadHandler.mockResolvedValue(error);
					postSelectFile(req, res);
				});

				it('should then redirect to the next page', () => {
					expect(postRenderView).toHaveBeenCalledWith(req, res, req.session, error);
				});
			});
		});
	});
});
