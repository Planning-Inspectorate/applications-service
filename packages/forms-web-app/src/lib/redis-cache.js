const { createClient } = require('redis');

const config = require('../config');
const logger = require('./logger');
const { redisCache } = config

let cacheClient = null;
const CACHE_TTL = redisCache.ttl //5 minutes for now, set from an env var?

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



const getCache = async (key) => {
	try {
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


const getCacheKeyCountByPattern = async (cacheKeyPattern) => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache get keys count');
			return null;
		}

		const cacheKeys = await cacheClient.keys(cacheKeyPattern);

		return cacheKeys.length;
	} catch (err) {
		logger.error(`Redis cache GET keys count error for pattern ${cacheKeyPattern}: ${err}`);
		return false;
	}
};


const setCache = async (key, value, ttl = CACHE_TTL) => {
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


const flushAllCache = async () => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache flush');
			return false;
		}
		//only delete keys starting with "cache:", we don't want to clear the entire redis instance (contains session data)
		const cacheKeyPattern = 'cache:*';

		logger.warn(`FLUSHING ALL CACHE`);

		const cachedKeys = await cacheClient.keys(cacheKeyPattern);
		console.log('cached keys to flush:>>', cachedKeys);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to flush');

			return 0
		}

		const deletedKeys = await cacheClient.del(cachedKeys);

		logger.info(`Cache flush complete - ${deletedKeys} keys deleted`);


		return deletedKeys
	} catch (err) {
		logger.error(`Redis cache FLUSH error: ${err}`);
		return false;
	}
}

const delCacheByPattern = async (pattern) => {
	try {
		if (!cacheClient) {
			logger.warn('Redis cache client not initialized, skipping cache clear by pattern');
			return false;
		}

		const cachedKeys = await cacheClient.keys(pattern);
		console.log('cached keys to clear:>>', cachedKeys);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to clear');

			return 0
		}

		const deletedKeys = await cacheClient.del(cachedKeys);
		logger.info(`Cache clear complete - ${deletedKeys} keys deleted`);

		return deletedKeys
	} catch (err) {
		logger.error(`Redis cache FLUSH error: ${err}`);
		return false;
	}
}


module.exports = {
	initializeCacheClient,
	getCache,
	getCacheKeyCountByPattern,
	setCache,
	delCacheByPattern,
	flushAllCache
};
