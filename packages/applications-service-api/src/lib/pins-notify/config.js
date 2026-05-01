/**
 * Config
 *
 * This is the single-source-of-truth for the application. All
 * config should be driven by environment variables where different
 * values are required
 */

module.exports = {
	logger: {
		level: process.env.LOGGER_LEVEL || 'info',
		redact: ['config.services.notify.apiKey']
	},
	services: {
		notify: {
			// TODO - Replace these with correct environment variables now now using k8s/charts
			baseUrl: 'http://mock-notify:3000',
			serviceId: 'dummy-service-id-for-notify',
			apiKey: 'dummy-api-key-for-notify'
		}
	}
};
