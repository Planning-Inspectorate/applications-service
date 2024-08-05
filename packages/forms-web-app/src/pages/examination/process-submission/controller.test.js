const { getProcessSubmission, postProcessSubmission } = require('./controller');

const { setExaminationUploadingState } = require('../_session/examination-session');
const { handleProcessSubmission } = require('./utils/process');
const { deleteExaminationSession } = require('../_session/delete-examination-session');
const { getSubmittingItemsSubtitle } = require('./utils/get-submitting-items-subtitle');

jest.mock('../_session/examination-session', () => ({
	setExaminationUploadingState: jest.fn()
}));
jest.mock('./utils/process', () => ({
	handleProcessSubmission: jest.fn()
}));
jest.mock('../_session/delete-examination-session', () => ({
	deleteExaminationSession: jest.fn()
}));
jest.mock('./utils/get-submitting-items-subtitle', () => ({
	getSubmittingItemsSubtitle: jest.fn()
}));

describe('examination/process-submission/controller', () => {
	describe('#getProcessSubmission', () => {
		const req = {};
		const res = {
			redirect: jest.fn(),
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When getting the process a submission page', () => {
			describe('and the page is rendered', () => {
				beforeEach(() => {
					getSubmittingItemsSubtitle.mockReturnValue('mock submitting items subtitle copy');
					getProcessSubmission(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/process-submission/view.njk', {
						submittingItemsSubtitle: 'mock submitting items subtitle copy'
					});
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					res.render.mockImplementationOnce(() => {
						throw new Error('an error');
					});
					getProcessSubmission(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
		it('should doa thing', () => {
			expect(true).toBe(true);
		});
	});
	describe('#postProcessSubmission', () => {
		const req = { session: { mockSession: 'mock session' } };
		const res = {
			redirect: jest.fn(),
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When submitting', () => {
			describe('and there is no issues', () => {
				beforeEach(() => {
					postProcessSubmission(req, res);
				});
				it('should set the uploading state to true', () => {
					expect(setExaminationUploadingState).toHaveBeenCalledWith(req.session, true);
				});
				it('should handle the submission', () => {
					expect(handleProcessSubmission).toHaveBeenCalledWith(req.session);
				});
				it('should delete the examination journey from session', () => {
					expect(deleteExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('submission-complete');
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					handleProcessSubmission.mockImplementationOnce(() => {
						throw new Error('an error');
					});
					postProcessSubmission(req, res);
				});
				it('should redirect to the process submission failure error page', () => {
					expect(res.redirect).toHaveBeenCalledWith('submission-error');
				});
			});
		});
		it('should doa thing', () => {
			expect(true).toBe(true);
		});
	});
});
