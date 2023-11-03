/* istanbul ignore file */

const appInsights = require('applicationinsights');
const config = require('./lib/config');
const logger = require('./lib/logger');
const server = require('./server');

async function main() {
	if (config.featureFlag.useApplicationInsights) {
		try {
			appInsights.setup().start();
		} catch (err) {
			logger.warn({ err }, 'Application insights failed to start: ');
		}
	}

	server();
}

main().catch((err) => {
	logger.fatal({ err }, 'Unable to start application');
});
