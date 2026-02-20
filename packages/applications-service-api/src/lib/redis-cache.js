const { redisCacheClient, RedisCacheError } = require('@pins/common/src/lib/redis-cache-client');
const config = require('./config');
const logger = require('./logger');

let cacheClient = null;

const initializeCacheClient = async () => {
	if (!config.redisCache.enabled) {
		logger.warn('Redis cache is disabled, skipping cache client initialization');
		return null;
	}

	if (cacheClient) {
		return cacheClient;
	}

	try {
		cacheClient = await redisCacheClient(config.redisCache.connectionString);
		return cacheClient;
	} catch (err) {
		logger.error(err, 'Failed to initialize Redis cache client');
		throw new RedisCacheError('Failed to initialize Redis cache client', err);
	}
};

const getCacheKeyCountByPattern = async (cacheKeyPattern) => {
	if (!cacheClient) {
		throw new RedisCacheError('Redis cache client not initialized');
	}

	try {
		const cacheKeys = await cacheClient.keys(cacheKeyPattern);
		return cacheKeys.length;
	} catch (err) {
		logger.error(err, `Redis cache GET keys count error for pattern ${cacheKeyPattern}`);
		throw new RedisCacheError(`Failed to get cache keys for pattern ${cacheKeyPattern}`, err);
	}
};

const flushAllCache = async () => {
	if (!cacheClient) {
		throw new RedisCacheError('Redis cache client not initialized');
	}

	try {
		//only delete keys starting with "cache:", we don't want to clear the entire redis instance (contains session data)
		const cacheKeyPattern = 'cache:*';

		logger.warn(`FLUSHING ALL CACHE`);

		const cachedKeys = await cacheClient.keys(cacheKeyPattern);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to flush');
			return 0;
		}

		const deletedKeys = await cacheClient.del(cachedKeys);

		logger.info(`Cache flush complete - ${deletedKeys} keys deleted`);

		return deletedKeys;
	} catch (err) {
		logger.error(err, `Redis cache FLUSH error`);
		throw new RedisCacheError('Failed to flush cache', err);
	}
};

const delCacheByPattern = async (pattern) => {
	if (!cacheClient) {
		throw new RedisCacheError('Redis cache client not initialized');
	}

	const isValidPattern = pattern.startsWith('cache:');

	if (!isValidPattern) {
		logger.warn(`Attempt to clear cache with unsupported pattern: ${pattern}`);
		throw new RedisCacheError(`Unsupported cache key pattern: ${pattern}`);
	}

	try {
		const cachedKeys = await cacheClient.keys(pattern);

		if (cachedKeys.length === 0) {
			logger.info('No cache keys found to clear');
			return 0;
		}

		const deletedKeys = await cacheClient.del(cachedKeys);
		logger.info(`Cache clear complete - ${deletedKeys} keys deleted`);

		return deletedKeys;
	} catch (err) {
		logger.error(err, `Redis cache DELETE by pattern error`);
		throw new RedisCacheError(`Failed to delete cache by pattern ${pattern}`, err);
	}
};

module.exports = {
	initializeCacheClient,
	getCacheKeyCountByPattern,
	delCacheByPattern,
	flushAllCache,
	RedisCacheError
};
