const { createClient } = require('redis');

const config = require('../config');
const logger = require('./logger');

let cacheClient = null;
const DEFAULT_TTL = 300; //5 minutes for now, set from an env var?

const initializeCacheClient = () => {
	if (cacheClient) {
		return cacheClient;
	}

	const redisConfig = config.db.session.redis;

	cacheClient = createClient({
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

	cacheClient.connect()

	return cacheClient;
};


// const initializeCacheClient = async () => {
// 	if (cacheClient) {
// 		return cacheClient;
// 	}
//
// 	const redisConfig = config.db.session.redis;
//
// 	cacheClient = createClient({
// 		socket: {
// 			host: redisConfig.host,
// 			port: redisConfig.port,
// 			tls: redisConfig.ssl
// 		},
// 		password: redisConfig.password,
// 		pingInterval: 1000 * 60 * 5
// 	});
//
// 	cacheClient.on('error', (err) => logger.error(`Redis cache client error: ${err}`));
//
// 	await cacheClient.connect();
// 	logger.info('Redis cache client connected');
//
// 	return cacheClient;
// };


const getCache = async (key) => {
	try {
		//const client = await initializeCacheClient();

		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache get');
			return null;
		}
		const cached = await cacheClient.get(`cache:${key}`);

		if (!cached) {
			return null;
		}

		//TODO: remove debug logging
		const keys = await cacheClient.keys('*');
		console.log('cache keys:>>');
		console.dir(keys, { depth: null, colors: true });

		return cached ? JSON.parse(cached) : null;
	} catch (err) {
		logger.error(`Redis cache GET error for key ${key}: ${err}`);
		return null;
	}
};


const setCache = async (key, value, ttl = DEFAULT_TTL) => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache set');
			return null;
		}

		await cacheClient.set(`cache:${key}`, JSON.stringify(value), { EX: ttl });

		return true;
	} catch (err) {
		logger.error(`Redis cache SET error for key ${key}: ${err}`);
		return false;
	}
};


const delCache = async (key) => {
	try {

		await cacheClient.del(`cache:${key}`);

		return true;
	} catch (err) {
		logger.error(`Redis cache DEL error for key ${key}: ${err}`);
		return false;
	}
};

const flushAllCache = async () => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache flush');
			return false;
		}
		//only delete keys starting with "cache:", we don't want to clear the entire redis instance (contains session data)
		const cacheKeyPattern = 'cache:*';
		let result = {
			success: false,
			deletedKeys: 0
		};

		logger.warn(`FLUSHING ALL CACHE`);

		const cachedKeys = await cacheClient.keys(cacheKeyPattern);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to flush');
			result.sucess = true;

			return result
		}

		const deletedKeys = await cacheClient.del(cachedKeys);

		logger.info(`Cache flush complete - ${deletedKeys.length} keys deleted`);

		result.success = true;
		result.deletedKeys = deletedKeys.length;

		return result
	} catch (err) {
		logger.error(`Redis cache FLUSH error: ${err}`);
		return false;
	}
}

const flushCacheByPattern = async (pattern) => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache flush by pattern');
			return false;
		}

		const cacheKeyPattern = `cache:${pattern}`;

		logger.warn(`FLUSHING CACHE BY PATTERN: ${pattern}`);

		const cachedKeys = await cacheClient.keys(cacheKeyPattern);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to flush for pattern');
			return true;
		}

		const deletedKeys = await cacheClient.del(cachedKeys);
		logger.info(`Cache flush by pattern complete - ${deletedKeys.length} keys deleted`);
		return true;
	} catch (err) {
		logger.error(`Redis cache FLUSH BY PATTERN error: ${err}`);
		return false;
	}
}


module.exports = {
	initializeCacheClient,
	getCache,
	setCache,
	delCache,
	flushCacheByPattern,
	flushAllCache
};
