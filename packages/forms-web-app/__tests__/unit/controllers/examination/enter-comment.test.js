const {
	getEnterComment,
	postEnterComment
} = require('../../../../src/controllers/examination/enter-comment');
const { mockReq, mockRes, mockResponse } = require('../../mocks');

const minMaxInputObject = {
	overMax: 'abcdefghjklmnopqrstvwxyzabcdefghjklmnopqrstvwxyzabcdefghjklmnopqr', // over 65,234 characters
	betweenMinMax: 'abc'
};

const pathShortner = (obj, path) => path.split('.').reduce((value, el) => value && value[el], obj);
const itemsPath = 'session.examination.selectedDeadlineItems.items';

const pageData = {
	backLinkUrl: '/examination/select-upload-evidence-or-comment',
	id: 'examination-enter-a-comment',
	pageTitle: 'Make a comment',
	title: 'Make a comment',
	hint: 'Comments on any submissions received by FIND ME',
	optionTitle: 'CHANGE ME'
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
		it('should call the correct template', () => {
			const mockRequest = { ...req };

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', pageData);
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
			mockRequest.session.examination.selectedDeadlineItems.items['0'].submissionType = 'else';
			postEnterComment(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();
			expect(pathShortner(mockRequest, itemsPath)[0].submissionType).toBe('else');
			expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
		});
	});
});
