const {
	getSelectFile,
	postSelectFile
} = require('../../../../src/controllers/examination/select-file');
const { mockReq, mockRes } = require('../../mocks');

const pageData = {
	backLinkUrl: '/examination/select-upload-evidence-or-comment',
	id: 'examination-select-file',
	pageTitle: 'Select a file',
	title: 'Select a file'
};

describe('controllers/examination/submitting-for', () => {
	let req;
	let res;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getSelectFile', () => {
		it('should call the correct template', () => {
			const mockRequest = { ...req };

			getSelectFile(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/select-file', pageData);
		});
	});

	describe('postSubmittingFor', () => {
		it('should call the correct template', () => {
			const mockRequest = { ...req };

			postSelectFile(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/select-file', pageData);
		});
	});
});
