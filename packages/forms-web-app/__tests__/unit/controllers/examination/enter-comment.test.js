const {
	getEnterComment,
	postEnterComment
} = require('../../../../src/controllers/examination/enter-comment');
const { mockReq, mockRes, mockResponse } = require('../../mocks');

const pathShortner = (obj, path) => path.split('.').reduce((value, el) => value && value[el], obj);
const itemsPath = 'session.examination.selectedDeadlineItems.items';

const pageData = {
	backLinkUrl: '/examination/select-upload-evidence-or-comment',
	id: 'examination-enter-a-comment',
	pageTitle: 'Make a comment',
	title: 'Make a comment',
	hint: 'Comments on any submissions received by FIND ME',
	optionTitle: 'CHANGE ME',
	comment: ''
};

describe('controllers/examination/enter-comment', () => {
	let req;
	let res;

	beforeEach(() => {
		res = mockRes();
		req = {
			...mockReq(),
			session: {
				examination: {
					selectedDeadlineItems: {
						activeId: '0',
						items: {
							0: {
								complete: false,
								itemId: '3',
								submissionItem: 'Statement of Commonality of SoCG ',
								submissionType: 'comment'
							}
						}
					}
				}
			}
		};

		jest.resetAllMocks();
	});

	describe('getEnterComment', () => {
		it('should render the view with default pageData', () => {
			const mockRequest = { ...req };

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', pageData);
		});

		it('should render the view with default and session pageData', function () {
			const mockRequest = { ...req };

			const comment = 'I am a comment';
			mockRequest.session.examination.comment = comment;

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
				...pageData,
				comment
			});
		});
	});

	describe('postEnterComment', () => {
		it('should redirect user to /examination/comment-has-personal-information-or-not', () => {
			res = mockResponse();
			const mockRequest = { ...req };
			postEnterComment(mockRequest, res);

			expect(res.render).not.toHaveBeenCalled();
			expect(pathShortner(mockRequest, itemsPath)[0].submissionType);
			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/comment-has-personal-information-or-not'
			);
		});

		it('should redirect user to /examination/select-a-file', () => {
			res = mockResponse();
			const mockRequest = { ...req };
			mockRequest.session.examination.selectedDeadlineItems.items['0'].submissionType = 'both';
			postEnterComment(mockRequest, res);

			expect(res.render).not.toHaveBeenCalled();
			expect(pathShortner(mockRequest, itemsPath)[0].submissionType);
			expect(res.redirect).toHaveBeenCalledWith('/examination/select-a-file');
		});

		it('should render error/unhandled-exception', () => {
			res = mockResponse();
			const mockRequest = { ...req };
			const mockSubmissionType = 'wrong submission type';
			mockRequest.session.examination.selectedDeadlineItems.items['0'].submissionType =
				mockSubmissionType;
			postEnterComment(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();
			expect(pathShortner(mockRequest, itemsPath)[0].submissionType).toBe(mockSubmissionType);
			expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
		});

		describe('Given the user is submitting comments only for a deadline', () => {
			it('should not allow characters > 65,234', function () {
				res = mockResponse();

				const errors = {
					errorSummary: [{ text: 'Your comment must be 65,234 characters or less', href: '#' }],
					errors: { error: 'error' }
				};
				const mockRequest = {
					...req,
					body: {
						'examination-enter-a-comment': 'I am a test comment',
						...errors
					}
				};

				postEnterComment(mockRequest, res);

				expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
					...errors,
					...pageData
				});
			});
			it('should not be empty', function () {
				res = mockResponse();

				const errors = {
					errorSummary: [{ text: 'Enter a comment', href: '#' }],
					errors: { error: 'error' }
				};
				const mockRequest = {
					...req,
					body: {
						'examination-enter-a-comment': '',
						...errors
					}
				};

				postEnterComment(mockRequest, res);

				expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
					...errors,
					...pageData
				});
			});
		});
	});
});
