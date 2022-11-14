const {
	getEvidenceOrComment,
	postEvidenceOrComment
} = require('../../../../../src/controllers/examination/evidence-or-comment/controller');

let {
	addKeyValueToActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');
let {
	deleteSubmissionType
} = require('../../../../../src/controllers/examination/evidence-or-comment/utils/delete-submission-type');
let {
	getPageData
} = require('../../../../../src/controllers/examination/evidence-or-comment/utils/get-page-data');
let {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/evidence-or-comment/utils/get-redirect-url');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));
jest.mock(
	'../../../../../src/controllers/examination/evidence-or-comment/utils/delete-submission-type',
	() => ({
		deleteSubmissionType: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/evidence-or-comment/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/evidence-or-comment/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

describe('controllers/examination/evidence-or-comment/controller', () => {
	const mockPageDataValue = { pageData: 'mock page data value' };

	describe('#getEvidenceOrComment', () => {
		describe('When rendering the evidence or comment page', () => {
			describe('and the render is successful', () => {
				const req = {
					session: {},
					query: {}
				};
				const res = {
					render: jest.fn()
				};
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					getEvidenceOrComment(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/evidence-or-comment',
						mockPageDataValue
					);
				});
			});
			describe('and an error is thrown', () => {
				const req = {
					session: {},
					query: {}
				};
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				beforeEach(() => {
					getPageData.mockImplementation(() => {
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
		describe('When handling an evidence or comment post', () => {
			describe('and there is an error', () => {
				const error = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				const req = {
					body: error,
					session: {},
					query: {}
				};
				const res = {
					render: jest.fn()
				};
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					postEvidenceOrComment(req, res);
				});
				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/evidence-or-comment', {
						...mockPageDataValue,
						...error
					});
				});
			});
			describe('and there is NOT a valid value in the body', () => {
				const req = {
					body: {},
					session: {},
					query: {}
				};
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				beforeEach(() => {
					postEvidenceOrComment(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is a valid value in the body', () => {
				const mockRedirectUrlValue = 'mock redirect url';
				const bodyValueKey = 'examination-evidence-or-comment';
				const req = {
					body: {
						[bodyValueKey]: 'mock body value'
					},
					session: 'mock session value',
					query: 'mock query value'
				};
				const res = {
					redirect: jest.fn()
				};
				beforeEach(() => {
					getRedirectUrl.mockReturnValue(mockRedirectUrlValue);
					postEvidenceOrComment(req, res);
				});

				it('should call the functions', () => {
					expect(getRedirectUrl).toHaveBeenCalledWith(
						req.query,
						req.session,
						req.body[bodyValueKey]
					);
					expect(deleteSubmissionType).toHaveBeenCalledWith(req.session, req.body[bodyValueKey]);
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						req.session,
						'submissionType',
						req.body[bodyValueKey]
					);
				});
				it('should redirect to', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrlValue);
				});
			});
		});
	});
});
