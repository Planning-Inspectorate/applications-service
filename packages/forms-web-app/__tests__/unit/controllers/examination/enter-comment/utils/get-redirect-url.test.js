const {
	getRedirectUrl
} = require('../../../../../../src/controllers/examination/enter-comment/utils/get-redirect-url');

describe('controllers/examination/enter-comment/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('when the argument is equal to "comment"', () => {
			const result = getRedirectUrl('comment');
			it('should return the comment has personal information route', () => {
				expect(result).toEqual('/examination/comment-has-personal-information-or-not');
			});
		});
		describe('when the argument is equal to "both"', () => {
			const result = getRedirectUrl('both');
			it('should return the select a file route', () => {
				expect(result).toEqual('/examination/select-a-file');
			});
		});
		describe('when the argument does not equal either "comment" or "both"', () => {
			it('it should render the error', () => {
				expect(() => getRedirectUrl('')).toThrow('Value does not equal a submission type');
			});
		});
	});
});
