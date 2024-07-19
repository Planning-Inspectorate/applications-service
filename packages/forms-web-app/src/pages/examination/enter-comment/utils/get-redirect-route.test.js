const { getRedirectRoute } = require('./get-redirect-route');

let {
	getActiveSubmissionItem,
	getSubmissionItemType
} = require('../../_session/submission-items-session');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn(),
	getSubmissionItemType: jest.fn()
}));

const req = {
	session: {}
};

describe('examination/enter-comment/utils/get-redirect-route', () => {
	describe('#getRedirectRoute', () => {
		describe('When getting the redirect route for the enter comment page', () => {
			describe('and the submission item type value is "comment"', () => {
				let result;

				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({});
					getSubmissionItemType.mockReturnValue('comment');
					result = getRedirectRoute(req.session);
				});

				it('should return the route', () => {
					expect(result).toEqual('comment-has-personal-information-or-not');
				});
			});

			describe('and the submission item type value is "both"', () => {
				let result;

				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({});
					getSubmissionItemType.mockReturnValue('both');
					result = getRedirectRoute(req.session);
				});

				it('should return the route', () => {
					expect(result).toEqual('select-a-file');
				});
			});

			describe('and the submission item type value is neither "comment" or "both"', () => {
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({});
					getSubmissionItemType.mockReturnValue('invalid value');
				});

				it('it should throw an error', () => {
					expect(() => getRedirectRoute(req.session)).toThrow(
						'Value does not match a required submission type option'
					);
				});
			});
		});
	});
});
