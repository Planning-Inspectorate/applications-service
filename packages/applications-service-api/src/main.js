/* istanbul ignore file */

const logger = require('./lib/logger');
const server = require('./server');

// eslint-disable-next-line require-await
async function main() {
	server();
}

main().catch((err) => {
	logger.fatal({ err }, 'Unable to start application');
});