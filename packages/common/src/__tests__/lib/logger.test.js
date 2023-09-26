jest.mock('pino');
const { pino } = require('pino');

jest.mock('../../config', () => ({
	logger: {
		level: 'debug',
		redact: ['some-key']
	},
	services: {
		notify: {
			baseUrl: 'http://example.com',
			serviceId: 'fake-service-id',
			apiKey: 'fake-api-key'
		}
	},
	isProduction: false
}));

describe('logger', () => {
	it('sets up logger', () => {
		require('../../lib/logger');
		expect(pino).toBeCalledWith({
			level: 'debug',
			redact: ['some-key']
		});
	});
});
