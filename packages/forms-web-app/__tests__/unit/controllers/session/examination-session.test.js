const {
	getExaminationSession
} = require('../../../../src/controllers/session/examination-session');
getExaminationSession;

describe('controllers/session/examination-session', () => {
	describe('#getExaminationSession', () => {
		describe('When getting the examination key from session', () => {
			describe('and the examination key exists', () => {
				const mockSession = { examination: 'examination session' };
				const result = getExaminationSession(mockSession);
				it('should return the object', () => {
					expect(result).toEqual('examination session');
				});
			});
			describe('and the examination key does not exists', () => {
				const mockSession = {};
				it('should throw an error', () => {
					expect(() => getExaminationSession(mockSession)).toThrow('No examination session');
				});
			});
		});
	});
});
