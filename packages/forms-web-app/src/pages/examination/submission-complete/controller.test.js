const { getSubmissionComplete } = require('./controller');
const { getExaminationSubmissionId } = require('../_session/examination-session');
const { getProjectEmailAddress } = require('../../../controllers/session/app-data-session');
const { getProjectsIndexURL } = require('../../projects/index/_utils/get-projects-index-url');

jest.mock('../_session/examination-session', () => ({
	getExaminationSubmissionId: jest.fn()
}));

jest.mock('../../../controllers/session/app-data-session', () => ({
	getProjectEmailAddress: jest.fn()
}));

jest.mock('../../projects/index/_utils/get-projects-index-url', () => ({
	getProjectsIndexURL: jest.fn()
}));

describe('submission-complete/controller', () => {
	describe('#getSubmissionComplete', () => {
		const session = {};
		const req = {
			session,
			params: { case_ref: '1234' }
		};
		const res = {
			redirect: jest.fn(),
			render: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('When getting the submission complete page', () => {
			beforeEach(() => {
				getExaminationSubmissionId.mockReturnValue('5678');
				getProjectEmailAddress.mockReturnValue('email@test.gov.uk');
				getProjectsIndexURL.mockReturnValue('mock url');
			});
			describe('and the page is rendered with submissionId, project email and project index URL', () => {
				beforeEach(() => {
					getSubmissionComplete(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/submission-complete/view.njk', {
						submissionId: '5678',
						projectEmail: 'email@test.gov.uk',
						projectsIndexURL: 'mock url'
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
