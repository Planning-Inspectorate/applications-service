let {
	getActiveSubmissionItem,
	addKeyValueToActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');
let {
	markActiveChecked
} = require('../../../../../src/controllers/examination/utils/mark-active-checked');

let {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/evidence-or-comment/utils/get-redirect-url');

const {
	getEvidenceOrComment,
	postEvidenceOrComment
} = require('../../../../../src/controllers/examination/evidence-or-comment/controller');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn(),
	addKeyValueToActiveSubmissionItem: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/utils/mark-active-checked', () => ({
	markActiveChecked: jest.fn()
}));

jest.mock(
	'../../../../../src/controllers/examination/evidence-or-comment/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

const expectedOptions = [
	{
		text: 'Write a comment',
		value: 'comment'
	},
	{
		text: 'Upload files',
		value: 'upload'
	},
	{
		text: 'Both',
		value: 'both'
	}
];
describe('controllers/examination/evidence-or-comment/controller', () => {
	describe('#getEvidenceOrComment', () => {
		describe('When rendering the evidence or comment page', () => {
			const mockSession = 'mock session';
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				session: mockSession
			};
			describe('and there is a submission type already selected', () => {
				const mockActiveSubmissionItem = {
					submissionItem: ' mock submission item',
					submissionType: 'mock submission type'
				};
				const mockCheckedOptions = 'options would have been checked';
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
					markActiveChecked.mockReturnValue(mockCheckedOptions);
					getEvidenceOrComment(req, res);
				});
				it('should call functions', () => {
					expect(getActiveSubmissionItem).toHaveBeenCalledWith(mockSession);
				});
				it('should render the page with the options and an option checked', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', {
						activeSubmissionItemTitle: ' mock submission item',
						backLinkUrl: '/examination/select-deadline-item',
						id: 'examination-evidence-or-comment',
						options: mockCheckedOptions,
						pageTitle: 'How would you like to submit comments ("written representation")?',
						title: 'How would you like to submit comments ("written representation")?'
					});
				});
			});
			describe('and there is no submission type already selected', () => {
				const mockActiveSubmissionItem = {
					submissionItem: ' mock submission item'
				};

				const mockCheckedOptions = 'options would have been checked';

				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
					markActiveChecked.mockReturnValue(mockCheckedOptions);
					getEvidenceOrComment(req, res);
				});
				it('should render the page with the options', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', {
						activeSubmissionItemTitle: ' mock submission item',
						backLinkUrl: '/examination/select-deadline-item',
						id: 'examination-evidence-or-comment',
						options: expectedOptions,
						pageTitle: 'How would you like to submit comments ("written representation")?',
						title: 'How would you like to submit comments ("written representation")?'
					});
				});
			});
			describe('and the there is an error', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getEvidenceOrComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});

	describe('#postEvidenceOrComment', () => {
		describe('When handling a evidence or comment post', () => {
			const mockSession = 'mock session';
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = {
				session: mockSession
			};
			const mockActiveSubmissionItem = {
				submissionItem: 'mock submission item',
				submissionType: 'mock submission type'
			};

			describe('and the body contains the correct key', () => {
				const mockEvidenceAndCommentValue = 'mock value';
				const mockRedirectURL = 'mock redirect url';
				beforeEach(() => {
					req.body = {
						'examination-evidence-or-comment': mockEvidenceAndCommentValue
					};
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
					getRedirectUrl.mockReturnValue(mockRedirectURL);

					postEvidenceOrComment(req, res);
				});
				it('should call the functions', () => {
					expect(getActiveSubmissionItem).toHaveBeenCalledWith(mockSession);
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						mockSession,
						'submissionType',
						mockEvidenceAndCommentValue
					);
					expect(getRedirectUrl).toHaveBeenCalledWith(
						{
							1: { text: 'Write a comment', value: 'comment' },
							2: { text: 'Upload files', value: 'upload' },
							3: { text: 'Both', value: 'both' }
						},
						mockEvidenceAndCommentValue
					);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectURL);
				});
			});

			describe('and the key is no in the body', () => {
				beforeEach(() => {
					req.body = {};
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
					postEvidenceOrComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there are errors', () => {
				beforeEach(() => {
					req.body = {
						errors: 'mock error',
						errorSummary: 'mock error summary'
					};
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
					postEvidenceOrComment(req, res);
				});
				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', {
						backLinkUrl: '/examination/select-deadline-item',
						activeSubmissionItemTitle: mockActiveSubmissionItem.submissionItem,
						errorSummary: 'mock error summary',
						errors: 'mock error',
						id: 'examination-evidence-or-comment',
						options: expectedOptions,
						pageTitle: 'How would you like to submit comments ("written representation")?',
						title: 'How would you like to submit comments ("written representation")?'
					});
				});
			});
			describe('and there is an unhandled exception', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postEvidenceOrComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
