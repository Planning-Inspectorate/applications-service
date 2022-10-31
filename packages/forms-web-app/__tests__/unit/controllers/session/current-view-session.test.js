const {
	getCurrentViewSession
} = require('../../../../src/controllers/session/current-view-session');
describe('#getCurrentViewSession', () => {
	describe('When gettign the current session', () => {
		describe('and the current session is available', () => {
			const mockSession = { currentView: 'mock current view' };
			const result = getCurrentViewSession(mockSession);
			it('should return the current view', () => {
				expect(result).toEqual(mockSession.currentView);
			});
		});
		describe('and the current session is NOT available', () => {
			it('should throw an error', () => {
				expect(() => getCurrentViewSession({})).toThrow('No current view in session');
			});
		});
	});
});
