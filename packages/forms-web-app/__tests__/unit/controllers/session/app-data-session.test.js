const { getProjectEmailAddress } = require('../../../../src/controllers/session/app-data-session');

describe('session/app-data-session', () => {
	describe('#getProjectEmailAddress', () => {
		describe('When getting the project email address from app data', () => {
			describe('and the project email address  is available', () => {
				const mockSession = { ProjectEmailAddress: 'mock project email' };
				const result = getProjectEmailAddress(mockSession);
				it('should return the current view', () => {
					expect(result).toEqual('mock project email');
				});
			});
			describe('and the project email address  is NOT available', () => {
				const mockSession = { appData: {} };
				it('should throw an error', () => {
					expect(() => getProjectEmailAddress(mockSession)).toThrow(
						'No project email address in app data session'
					);
				});
			});
		});
	});
});
