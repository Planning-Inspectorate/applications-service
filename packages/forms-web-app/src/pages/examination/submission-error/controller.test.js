const { getSubmissionError } = require('./controller');

const { handleProcessSubmissionRetry } = require('./utils/handleProcessSubmissionRetry');

jest.mock('./utils/handleProcessSubmissionRetry', () => ({
	handleProcessSubmissionRetry: jest.fn()
}));

describe('examination/submission-error/controller', () => {
	describe('#getSubmissionError', () => {
		describe('When getting the submission error page', () => {
			const req = {
				params: { case_ref: 'mock-case-ref' },
				query: { text: 'mock query' },
				session: { text: 'mock session' }
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const indexURL = '/projects/mock-case-ref/examination/have-your-say-during-examination';
			describe('and there are no errors thrown', () => {
				beforeEach(() => {
					handleProcessSubmissionRetry.mockReturnValue();
					getSubmissionError(req, res);
				});
				it('should return the page template and page data', () => {
					expect(res.render).toHaveBeenCalledWith('error/have-your-say-submission-failed', {
						indexURL
					});
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					handleProcessSubmissionRetry.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getSubmissionError(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
