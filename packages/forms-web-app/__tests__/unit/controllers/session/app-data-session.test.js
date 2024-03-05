const { getProjectEmailAddress } = require('../../../../src/controllers/session/app-data-session');
const config = require('../../../../src/config');

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
			describe('and the project email address is NOT available', () => {
				const mockSession = { appData: {} };
				config.pinsContactDetails.enquiriesEmailAddress = 'mock email';
				it('should use default enquiriesEmailAddress', () => {
					const result = getProjectEmailAddress(mockSession);
					expect(result).toEqual('mock email');
				});
			});
		});
	});
});
