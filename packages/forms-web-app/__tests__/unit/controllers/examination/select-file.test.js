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
		req = {
			...mockReq(),
			body: {
				'examination-select-file': null
			},
			session: {
				currentView: null,
				examination: {
					selectedDeadlineItems: {
						activeId: '0',
						items: {
							0: {
								['examination-evidence-or-comment']: null,
								files: [{}]
							}
						}
					}
				}
			}
		};
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
		it('should redirect to `/examination/files-have-personal-information-or-not`', () => {
			const mockRequest = { ...req };

			mockRequest.body['examination-select-file'] = 'one-file';
			mockRequest.session.examination.selectedDeadlineItems.items[0].submissionType = 'upload';

			postSelectFile(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/files-have-personal-information-or-not'
			);
		});

		it('should redirect to `/examination/comment-file-has-personal-information-or-not`', () => {
			const mockRequest = { ...req };

			mockRequest.body['examination-select-file'] = 'more-than-one-file';
			mockRequest.session.examination.selectedDeadlineItems.items[0].submissionType = 'both';

			postSelectFile(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/comment-file-has-personal-information-or-not'
			);
		});
	});
});
