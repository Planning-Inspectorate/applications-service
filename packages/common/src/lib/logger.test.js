const logger = require('./logger');

describe('logger', () => {
	it('should export a logger', () => {
		expect(typeof logger.debug).toBe('function');
		expect(typeof logger.info).toBe('function');
		expect(typeof logger.warn).toBe('function');
		expect(typeof logger.error).toBe('function');
	});
});
