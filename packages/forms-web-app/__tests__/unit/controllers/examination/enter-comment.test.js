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
	hint: 'Any further information requested by',
	captionTitle: 'Deadline item:',
	comment: ''
};

const hintValue = '`${pageData.hint} ${pathShortner(mockRequest, itemsPath)[0].submissionItem}`';

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

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
				...pageData,
				hint: eval(hintValue)
			});
		});

		it('should render the view with default and session pageData', function () {
			const mockRequest = { ...req };

			const comment = 'I am a comment';
			mockRequest.session.examination.comment = comment;

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', {
				...pageData,
				comment,
				hint: eval(hintValue)
			});
		});

		it('should render not found view', function () {
			const mockRequest = { ...req };
			delete mockRequest.session;

			res = mockResponse();

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('error/not-found');
			expect(res.redirect).not.toHaveBeenCalled();
		});
	});

	describe('postEnterComment', () => {
		it('should redirect user to /examination/comment-has-personal-information-or-not', () => {
			const mockRequest = { ...req };
			postEnterComment(mockRequest, res);

			expect(res.render).not.toHaveBeenCalled();
			expect(pathShortner(mockRequest, itemsPath)[0].submissionType);
			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/comment-has-personal-information-or-not'
			);
		});

		it('should redirect user to /examination/select-a-file', () => {
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

		it('should render error/not-found', () => {
			res = mockResponse();
			const mockRequest = { ...req };
			delete mockRequest.session;
			postEnterComment(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});

		describe('Given the user is submitting comments only for a deadline', () => {
			it('should not allow characters > 65,234', function () {
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
					...pageData,
					hint: eval(hintValue)
				});
			});
			it('should not be empty', function () {
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
					...pageData,
					hint: eval(hintValue)
				});
			});
		});
	});
});
