const { getBackLinkUrl } = require('./get-back-link-url');
describe('#getBackLinkUrl', () => {
	describe('When going back a page for personal information', () => {
		describe('and the current view id is', () => {
			describe('examination-personal-information-comment', () => {
				const currentViewId = 'examination-personal-information-comment';
				const result = getBackLinkUrl(currentViewId);
				it('should return the correct back link', () => {
					expect(result).toEqual('/examination/enter-a-comment');
				});
			});
			describe('examination-personal-information-comment-files', () => {
				const currentViewId = 'examination-personal-information-comment-files';
				const result = getBackLinkUrl(currentViewId);
				it('should return the correct back link', () => {
					expect(result).toEqual('/examination/select-a-file');
				});
			});
			describe('examination-personal-information-files', () => {
				const currentViewId = 'examination-personal-information-files';
				const result = getBackLinkUrl(currentViewId);
				it('should return the correct back link', () => {
					expect(result).toEqual('/examination/select-a-file');
				});
			});
		});
		describe('and there is no back link url created', () => {
			it('should throw an error', () => {
				expect(() => getBackLinkUrl()).toThrow(
					'Current view ID does not match any personal information IDs'
				);
			});
		});
	});
});
