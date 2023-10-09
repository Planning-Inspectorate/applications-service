const { getBackLinkURL } = require('./get-back-link-url');

describe('pages/process-guide/_utils/get-back-link-url', () => {
	describe('#getBackLinkURL', () => {
		describe('When getting the back link URL for the process guide page', () => {
			describe('and there is no previous url', () => {
				const mockURL = '';
				const mockSession = {
					referrerBackLink: 'mock session referrer back link'
				};
				let backLinkURL;
				beforeEach(() => {
					backLinkURL = getBackLinkURL(mockURL, mockSession);
				});
				it('should return the session referrerBackLink value', () => {
					expect(backLinkURL).toEqual('mock session referrer back link');
				});
			});

			describe('and there is a previous url which is not part of the process guide journey', () => {
				const mockURL = '/mock/previous/url';
				const mockSession = {
					referrerBackLink: 'mock session referrer back link'
				};
				let backLinkURL;
				beforeEach(() => {
					backLinkURL = getBackLinkURL(mockURL, mockSession);
				});
				it('should return the url', () => {
					expect(backLinkURL).toEqual('/mock/previous/url');
				});
			});

			describe('and there is a previous url which is part of the process guide journey', () => {
				const mockURL = '/mock/decision-making-process-guide/url';
				const mockSession = {
					referrerBackLink: 'mock session referrer back link'
				};
				let backLinkURL;
				beforeEach(() => {
					backLinkURL = getBackLinkURL(mockURL, mockSession);
				});
				it('should return the session referrerBackLink value', () => {
					expect(backLinkURL).toEqual('mock session referrer back link');
				});
			});
		});
	});
});
