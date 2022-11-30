const {
	getAppDataSession,
	getProjectEmailAddress
} = require('../../../../src/controllers/session/app-data-session');

describe('session/app-data-session', () => {
	describe('#getAppDataSession', () => {
		describe('When getting the current session app data', () => {
			describe('and the current app data is available', () => {
				const mockSession = { appData: 'mock app data' };
				const result = getAppDataSession(mockSession);
				it('should return the current view', () => {
					expect(result).toEqual('mock app data');
				});
			});
			describe('and the app data is NOT available', () => {
				it('should throw an error', () => {
					expect(() => getAppDataSession({})).toThrow('No app data in session');
				});
			});
		});
	});

	describe('#getProjectEmailAddress', () => {
		describe('When getting the project email address from app data', () => {
			describe('and the project email address  is available', () => {
				const mockSession = { appData: { ProjectEmailAddress: 'mock project email' } };
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
