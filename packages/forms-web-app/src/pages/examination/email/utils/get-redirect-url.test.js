const { getRedirectUrl } = require('./get-redirect-url');

describe('controllers/examination/email/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the back link for the email page', () => {
			describe('and the page is in edit mode', () => {
				const mockQuery = { mode: 'edit' };
				const mockSession = {};
				const result = getRedirectUrl(mockQuery, mockSession);
				it('should return the check your answers url', () => {
					expect(result).toEqual('check-your-answers');
				});
			});
			describe('and the session examination showChooseDeadline value is true', () => {
				const mockQuery = {};
				const mockSession = { examination: { showChooseDeadline: true } };
				const result = getRedirectUrl(mockQuery, mockSession);
				it('should return the choose-deadline url', () => {
					expect(result).toEqual('choose-deadline');
				});
			});
			describe('and the page is NOT in edit mode or the session examination showChooseDeadline value is false', () => {
				const mockQuery = {};
				const mockSession = {};
				const result = getRedirectUrl(mockQuery, mockSession);
				it('should return the select a deadline url', () => {
					expect(result).toEqual('select-deadline-item');
				});
			});
		});
	});
});
