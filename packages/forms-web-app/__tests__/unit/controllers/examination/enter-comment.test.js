const {
	getEnterComment,
	postEnterComment
} = require('../../../../src/controllers/examination/enter-comment');
const { mockReq, mockRes, mockResponse } = require('../../mocks');

const pageData = {
	backLinkUrl: '/examination/select-upload-evidence-or-comment',
	id: 'examination-enter-a-comment',
	pageTitle: 'Make a comment',
	title: 'Make a comment',
	hint: 'Comments on any submissions received by FIND ME',
	optionTitle: 'CHANGE ME'
};

describe('controllers/examination/submitting-for', () => {
	let req;
	let res;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getEnterComment', () => {
		it('should call the correct template', () => {
			const mockRequest = { ...req };

			getEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/enter-comment', pageData);
		});
	});

	describe('postSubmittingFor', () => {
		it('should call the correct template', () => {
			res = mockResponse();
			const mockRequest = { ...req };

			postEnterComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
