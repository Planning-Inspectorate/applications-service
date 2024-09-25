const { getSubmissionComplete } = require('./controller');

const { getExaminationSubmissionId } = require('../_session/examination-session');
const { getProjectEmailAddress } = require('../../../controllers/session/app-data-session');

jest.mock('../_session/examination-session', () => ({
	getExaminationSubmissionId: jest.fn()
}));

jest.mock('../../../controllers/session/app-data-session', () => ({
	getProjectEmailAddress: jest.fn()
}));

describe('submission-complete/controller', () => {
	describe('#getSubmissionComplete', () => {
		const session = {};
		const req = { session };
		const res = {
			redirect: jest.fn(),
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		const mockProjectEmail = 'dummy.email@testing.gov.uk';
		describe('When getting the submission complete page', () => {
			beforeEach(() => {
				getExaminationSubmissionId.mockReturnValue('1234');
				getProjectEmailAddress.mockReturnValue(mockProjectEmail);
			});
			describe('and the page is rendered with submissionId and project email', () => {
				beforeEach(() => {
					getSubmissionComplete(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/submission-complete/view.njk', {
						submissionId: '1234',
						projectEmail: 'dummy.email@testing.gov.uk'
					});
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					res.render.mockImplementationOnce(() => {
						throw new Error('an error');
					});
					getSubmissionComplete(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
