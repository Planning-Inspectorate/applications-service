const { getEvidenceOrComment, postEvidenceOrComment } = require('./controller');

let { addKeyValueToActiveSubmissionItem } = require('../_session/submission-items-session');
let { deleteSubmissionType } = require('./utils/delete-submission-type');
let { getPageData } = require('./utils/get-page-data');
let { getRedirectUrl } = require('./utils/get-redirect-url');

jest.mock('../_session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));
jest.mock('./utils/delete-submission-type', () => ({
	deleteSubmissionType: jest.fn()
}));
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('./utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));

describe('examination/evidence-or-comment/controller', () => {
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
						'examination/evidence-or-comment/view.njk',
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
				beforeEach(async () => {
					getPageData.mockReturnValue(mockPageDataValue);
					await postEvidenceOrComment(req, res);
				});
				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('examination/evidence-or-comment/view.njk', {
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
				beforeEach(async () => {
					await postEvidenceOrComment(req, res);
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
				beforeEach(async () => {
					getRedirectUrl.mockReturnValue(mockRedirectUrlValue);
					await postEvidenceOrComment(req, res);
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
