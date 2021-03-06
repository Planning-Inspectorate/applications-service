/* istanbul ignore file */

const logger = require('./lib/logger');
const server = require('./server');

async function main() {
	server();
}

main().catch((err) => {
	logger.fatal({ err }, 'Unable to start application');
});
