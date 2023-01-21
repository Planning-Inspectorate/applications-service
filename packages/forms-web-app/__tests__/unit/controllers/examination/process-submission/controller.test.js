const {
	getProcessSubmission,
	postProcessSubmission
} = require('../../../../../src/controllers/examination/process-submission/controller');
const {
	setExaminationUploadingState
} = require('../../../../../src/controllers/examination/session/examination-session');
const {
	handleProcessSubmission
} = require('../../../../../src/controllers/examination/process-submission/utils/process');
const {
	deleteExaminationSession
} = require('../../../../../src/controllers/examination/session/delete-examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	setExaminationUploadingState: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/process-submission/utils/process', () => ({
	handleProcessSubmission: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/session/delete-examination-session', () => ({
	deleteExaminationSession: jest.fn()
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
					getProcessSubmission(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/process-submission', {
						text: 'This may take a few minutes.',
						title: 'Process submission',
						warningText: 'Do not refresh this page or navigate away until processing is complete.'
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
					expect(res.redirect).toHaveBeenCalledWith('/examination/submission-complete');
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
					expect(res.redirect).toHaveBeenCalledWith('/examination/submission-error');
				});
			});
		});
		it('should doa thing', () => {
			expect(true).toBe(true);
		});
	});
});
