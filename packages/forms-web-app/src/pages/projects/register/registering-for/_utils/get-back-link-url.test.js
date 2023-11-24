const { getBackLinkURL } = require('./get-back-link-url');

jest.mock('../../../../../config', () => {
	return { server: { host: 'from-site' } };
});

describe('pages/projects/register/registering-for/_utils/get-back-link-url', () => {
	describe('#getBackLinkURL', () => {
		describe('When getting the registering for back link URL', () => {
			describe('and the the mode is edit', () => {
				it('should return the referrer URL', () => {
					const backLinkURL = getBackLinkURL('from-site/url', 'mock-case-reference', {
						mode: 'edit'
					});

					expect(backLinkURL).toEqual('from-site/url');
				});
			});

			describe('and the mode is not edit', () => {
				it('should return the register index URL', () => {
					const backLinkURL = getBackLinkURL('from-site', 'mock-case-reference', {
						mode: 'not-edit'
					});

					expect(backLinkURL).toEqual(
						'/projects/mock-case-reference/register/register-have-your-say'
					);
				});
			});
		});
	});
});
