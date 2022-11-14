/* istanbul ignore file */

const { createServer } = require('@pins/common');

const app = require('./app');
const config = require('./config');
const logger = require('./lib/logger');

createServer(app, config, logger);
