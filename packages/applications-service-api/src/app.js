const express = require('express');
const pinoExpress = require('express-pino-logger');
const compression = require('compression');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const config = require('./lib/config');
const { initializeCacheClient } = require('./lib/redis-cache');
const logger = require('./lib/logger');
const routes = require('./routes');
const apiErrorHandler = require('./middleware/apiErrorHandler');

const app = express();

app.use(bodyParser.json());

app.use(
	pinoExpress({
		logger,
		genReqId: (req) => req.headers['x-correlation-id'] || uuid.v4()
	})
);

app.use(bodyParser.json()).use(compression()); /* gzip compression */

if (config.redisCache.enabled) {
	initializeCacheClient();
}

app.use('/', routes).use(apiErrorHandler);

module.exports = app;
