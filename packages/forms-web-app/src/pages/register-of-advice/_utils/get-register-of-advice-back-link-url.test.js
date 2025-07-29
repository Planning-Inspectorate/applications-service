const { getRegisterOfAdviceBackLinkURL } = require('./get-register-of-advice-back-link-url');

describe('getRegisterOfAdviceBackLinkURL', () => {
	it('returns /register-of-advice for English', () => {
		expect(getRegisterOfAdviceBackLinkURL('en')).toBe('/register-of-advice');
		expect(getRegisterOfAdviceBackLinkURL(undefined)).toBe('/register-of-advice');
		expect(getRegisterOfAdviceBackLinkURL('')).toBe('/register-of-advice');
	});

	it('returns /register-of-advice?lang=cy for Welsh', () => {
		expect(getRegisterOfAdviceBackLinkURL('cy')).toBe('/register-of-advice?lang=cy');
	});
});
