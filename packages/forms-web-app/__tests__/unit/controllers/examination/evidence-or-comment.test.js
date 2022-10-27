const {
	getEvidenceOrComment,
	postEvidenceOrComment
} = require('../../../../src/controllers/examination/evidence-or-comment');
const { mockReq, mockRes } = require('../../mocks');

const evidenceOrCommentOptions = {
	1: {
		value: 'comment',
		text: 'Write a comment'
	},
	2: {
		value: 'upload',
		text: 'Upload files'
	},
	3: {
		value: 'both',
		text: 'Both'
	}
};

const pageData = {
	backLinkUrl: '/examination/select-deadline-item',
	id: 'examination-evidence-or-comment',
	options: [evidenceOrCommentOptions[1], evidenceOrCommentOptions[2], evidenceOrCommentOptions[3]],
	pageTitle: 'How would you like to submit comments ("written representation")?',
	selectedDeadlineItemTitle: 'Test selected deadline item',
	title: 'How would you like to submit comments ("written representation")?'
};

describe('controllers/examination/submitting-for', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					selectedDeadlineItems: {
						activeId: '0',
						items: [
							{
								complete: false,
								itemId: 0,
								submissionItem: 'Test selected deadline item'
							}
						]
					}
				}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getEvidenceOrComment', () => {
		it('should call the correct template: no session', () => {
			const mockRequest = { ...req };

			getEvidenceOrComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', pageData);
		});

		it('should call the correct template: with session', () => {
			const mockRequest = {
				...req,
				session: {
					examination: {
						selectedDeadlineItems: {
							activeId: '0',
							items: [
								{
									complete: false,
									itemId: 0,
									submissionItem: 'Test selected deadline item',
									submissionType: 'upload'
								}
							]
						}
					}
				}
			};

			const setEvidenceOrCommentData = { ...pageData };
			const evidenceOrCommentValues = { ...evidenceOrCommentOptions };
			const selectedEvidenceOrCommentValue =
				mockRequest.session.examination.selectedDeadlineItems.items[
					mockRequest.session.examination.selectedDeadlineItems.activeId
				].submissionType;

			const updatedEvidenceOrCommentValues = Object.keys(evidenceOrCommentValues).map(
				(evidenceOrCommentValue) => {
					const valueChecked =
						evidenceOrCommentValues[evidenceOrCommentValue].value ===
						selectedEvidenceOrCommentValue;

					if (!valueChecked) return evidenceOrCommentValues[evidenceOrCommentValue];

					return {
						...evidenceOrCommentValues[evidenceOrCommentValue]
					};
				}
			);

			setEvidenceOrCommentData.options = updatedEvidenceOrCommentValues;

			getEvidenceOrComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith(
				'pages/examination/evidence-or-comment',
				setEvidenceOrCommentData
			);
		});
	});

	describe('postSubmittingFor', () => {
		it('should render pages/examination/evidence-or-comment with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			postEvidenceOrComment(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', {
				...pageData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/check-your-answers', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-evidence-or-comment': 'comment'
				},
				query: {
					mode: 'edit'
				}
			};

			postEvidenceOrComment(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
		});

		it('should redirect to /examination/enter-a-comment', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-evidence-or-comment': 'comment'
				}
			};

			postEvidenceOrComment(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/enter-a-comment');
		});

		it('should redirect to /examination/select-a-file', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-evidence-or-comment': 'upload'
				}
			};

			postEvidenceOrComment(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/select-a-file');
		});

		it('should redirect to /examination/enter-a-comment', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-evidence-or-comment': 'both'
				}
			};

			postEvidenceOrComment(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/enter-a-comment');
		});
	});
});
