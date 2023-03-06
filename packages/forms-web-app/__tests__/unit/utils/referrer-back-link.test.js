const { referrerBackLink } = require('../../../src/utils/referrer-back-link');
describe('referrerBackLink', () => {
	describe('When a getting the back link for a referrer', () => {
		describe('and the referrer is present', () => {
			const refUrl = 'mock referrer link';
			const mockSession = {};
			const result = referrerBackLink(refUrl, mockSession);
			it('should set the back link on the session', () => {
				expect(mockSession.referrerBackLink).toEqual(refUrl);
			});
			it('should return the referrer link', () => {
				expect(result).toEqual(refUrl);
			});
		});
		describe('and the referrer is not set with no session back link', () => {
			const mockSession = {};
			const result = referrerBackLink('', mockSession);
			it('should return an undefined', () => {
				expect(result).toBeUndefined();
			});
		});
		describe('and the referrer is not set with a session back link', () => {
			const mockSession = { referrerBackLink: 'old ref back link' };
			const result = referrerBackLink('', mockSession);
			it('should return an undefined', () => {
				expect(result).toEqual('old ref back link');
			});
		});
	});
});
