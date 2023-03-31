const { getBackLinkUrl } = require('./get-back-link-url');

describe('examination/select-deadline/utils/get-back-link-url', () => {
	describe('#getBackLinkUrl', () => {
		describe('When getting the back ling URL for the select deadline page', () => {
			describe('and the query is in edit mode', () => {
				const mockQuery = { mode: 'edit' };
				const mockSession = {};
				const result = getBackLinkUrl(mockQuery, mockSession);
				it('should return the url', () => {
					expect(result).toEqual('check-your-deadline-item');
				});
			});
			describe('and the session examination showChooseDeadline value is true', () => {
				const mockQuery = {};
				const mockSession = { examination: { showChooseDeadline: true } };
				const result = getBackLinkUrl(mockQuery, mockSession);
				it('should return the choose-deadline url', () => {
					expect(result).toEqual('choose-deadline');
				});
			});
			describe('and the query is NOT in edit mode', () => {
				const mockQuery = {};
				const mockSession = {};
				const result = getBackLinkUrl(mockQuery, mockSession);
				it('should return the url', () => {
					expect(result).toEqual('your-email-address');
				});
			});
		});
	});
});
