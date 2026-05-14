const { createClient } = require('redis');
const logger = require('./logger');

class RedisCacheError extends Error {
	constructor(message, originalError = null) {
		super(message);
		this.name = 'RedisCacheError';
		this.originalError = originalError;
	}
}

const redisCacheClient = async (redisConfig) => {
	if (!redisConfig) {
		throw new RedisCacheError('Redis cache configuration is required to initialize cache client');
	}

	const cacheClient = createClient({
		socket: {
			host: redisConfig.host,
			port: redisConfig.port,
			tls: redisConfig.ssl
		},
		password: redisConfig.password,
		pingInterval: 1000 * 60 * 5 // 5 minutes; to stop Azure Redis 10 minutes idle timeout
	});

	cacheClient.on('connect', () => logger.info('Initiating connection to redis cache client...'));
	cacheClient.on('ready', () => logger.info('Connected to redis cache client successfully...'));
	cacheClient.on('end', () => logger.info('Disconnected from redis cache client...'));
	cacheClient.on('error', (err) =>
		logger.error(`Could not establish a connection with redis cache client: ${err}`)
	);
	cacheClient.on('reconnecting', () => logger.info('Reconnecting to redis cache client...'));

	await cacheClient.connect();

	return cacheClient;
};

module.exports = { redisCacheClient, RedisCacheError };
