const { getRedirectUrl } = require('./get-redirect-url');

let { getRedirectRoute } = require('./get-redirect-route');
let { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
let { isSubmissionTypePrevious } = require('./is-submission-type-previous');

jest.mock('./get-redirect-route', () => ({
	getRedirectRoute: jest.fn()
}));
jest.mock('../../_utils/get-submission-item-page-url', () => ({
	getSubmissionItemPageUrl: jest.fn()
}));
jest.mock('./is-submission-type-previous', () => ({
	isSubmissionTypePrevious: jest.fn()
}));

const req = {
	query: {},
	session: {}
};
const mockRedirectRouteValue = '/mock-redirect-route-value';
const mockSubmissionItemPageUrlValue = '/mock-submission-item-page-url-value';
const mockValue = 'mock value';

describe('examination/evidence-or-comment/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the redirect URL for the evidence or comment page', () => {
			describe('and the selected submission type matches the previous submission type', () => {
				let redirectUrl;
				beforeEach(() => {
					getRedirectRoute.mockReturnValue(mockRedirectRouteValue);
					isSubmissionTypePrevious.mockReturnValue(true);
					getSubmissionItemPageUrl.mockReturnValue(mockSubmissionItemPageUrlValue);
					redirectUrl = getRedirectUrl(req.query, req.session, mockValue);
				});
				it('should return the URL', () => {
					expect(redirectUrl).toEqual(mockSubmissionItemPageUrlValue);
				});
			});
			describe('and the selected submission type does not match the previous submission type', () => {
				let redirectUrl;
				beforeEach(() => {
					getRedirectRoute.mockReturnValue(mockRedirectRouteValue);
					isSubmissionTypePrevious.mockReturnValue(false);
					redirectUrl = getRedirectUrl(req.query, req.session, mockValue);
				});
				it('should return the URL', () => {
					expect(redirectUrl).toEqual(`${mockRedirectRouteValue}`);
				});
			});
		});
	});
});
