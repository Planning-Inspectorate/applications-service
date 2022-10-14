const {
	getPersonalInformation,
	postPersonalInformation
} = require('../../../../src/controllers/examination/personal-information');
const { mockReq, mockRes } = require('../../mocks');

const personalInformationOptions = {
	1: {
		value: 'yes',
		text: 'Yes'
	},
	2: {
		value: 'no',
		text: 'No'
	}
};

const sharedData = {
	hintHtml:
		"<span>Check if your files contain information about:</span><ul><li>children</li><li>health</li><li>crime</li></ul><span>This also includes any information relating to an individual's:</span><ul><li>race</li><li>ethnic origin</li><li>politics</li><li>religion</li><li>trade union membership</li><li>genetics</li><li>biometrics</li><li>sex life</li><li>sexual orientation</li></ul>",
	options: [personalInformationOptions[1], personalInformationOptions[2]]
};

const pageData = {
	comment: {
		backLinkUrl: '/examination/enter-a-comment',
		id: 'examination-personal-information-comment',
		pageTitle: 'Comment has personal information or not',
		title: 'Does your comment contain personal information?'
	},
	commentFiles: {
		backLinkUrl: '/examination/select-a-file',
		id: 'examination-personal-information-comment-files',
		pageTitle: 'Comment or files has personal information or not',
		title: 'Do your comment and files contain personal information?'
	},
	files: {
		backLinkUrl: '/examination/select-a-file',
		id: 'examination-personal-information-files',
		pageTitle: 'Files have personal information or not',
		title: 'Do your files contain personal information?'
	}
};

describe('controllers/examination/personal-information', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				currentView: null,
				examination: {
					selectedDeadlineItems: {
						activeId: '0',
						items: {
							0: {
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

	describe('getPersonalInformation', () => {
		it("should call the correct template rendered with the 'comment' page data", () => {
			const mockRequest = { ...req };

			mockRequest.session.currentView = pageData.comment;

			getPersonalInformation(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
				...sharedData,
				...pageData.comment
			});
		});

		it("should call the correct template rendered with the 'commentFiles' page data", () => {
			const mockRequest = { ...req };

			mockRequest.session.currentView = pageData.commentFiles;

			getPersonalInformation(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
				...sharedData,
				...pageData.commentFiles
			});
		});

		it("should call the correct template rendered with the 'file' page data", () => {
			const mockRequest = { ...req };

			mockRequest.session.currentView = pageData.files;

			getPersonalInformation(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
				...sharedData,
				...pageData.files
			});
		});

		it('should call the correct template rendered with set session data', () => {
			const mockRequest = { ...req };

			mockRequest.session.examination.selectedDeadlineItems.items[0].personalInformation =
				personalInformationOptions[1].value;

			const copiedOptions = { ...personalInformationOptions };

			const modifiedOptions = Object.keys(copiedOptions).map((modifiedOption) => {
				const optionChecked =
					copiedOptions[modifiedOption].value === personalInformationOptions[1].value;

				if (!optionChecked) return { ...copiedOptions[modifiedOption] };

				return {
					...copiedOptions[modifiedOption],
					checked: 'checked'
				};
			});

			mockRequest.session.currentView = pageData.comment;

			getPersonalInformation(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
				...sharedData,
				...pageData.comment,
				options: modifiedOptions
			});
		});
	});

	describe('postPersonalInformation', () => {
		it('should render template with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			mockRequest.session.currentView = pageData.comment;

			postPersonalInformation(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
				...sharedData,
				...pageData.comment,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/check-your-deadline-item when on the comment page and the value is set to yes or no', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-comment': 'yes'
				}
			};

			mockRequest.session.currentView = pageData.comment;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
		});

		it('should redirect to /examination/select-which-files-comments-have-personal-information when on the commentFiles page and the value is set to yes', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-comment-files': 'yes'
				}
			};

			mockRequest.session.currentView = pageData.commentFiles;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/select-which-files-comments-have-personal-information'
			);
		});

		it('should redirect to /examination/check-your-deadline-item when on the commentFiles page and the value is set to no', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-comment-files': 'no'
				}
			};

			mockRequest.session.currentView = pageData.commentFiles;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
		});

		it('should redirect to /examination/check-your-deadline-item when on the files page and the value is set to yes and 1 file is present', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-files': 'yes'
				}
			};

			mockRequest.session.currentView = pageData.files;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
		});

		it('should redirect to /examination/check-your-deadline-item when on the files page and the value is set to no and 1 file is present', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-files': 'no'
				}
			};

			mockRequest.session.currentView = pageData.files;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
		});

		it('should redirect to /examination/which-files-have-personal-information-or-not when on the files page and the value is set to yes and more than 1 file is present', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-personal-information-files': 'yes'
				}
			};

			mockRequest.session.examination.selectedDeadlineItems.items[0].files = [{}, {}];

			mockRequest.session.currentView = pageData.files;

			postPersonalInformation(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/examination/which-files-have-personal-information-or-not'
			);
		});
	});
});
