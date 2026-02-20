const { redisCacheClient, RedisCacheError } = require('@pins/common/src/lib/redis-cache-client');

const config = require('../config');
const logger = require('./logger');
const { redisCache } = config;

let cacheClient = null;

const initializeCacheClient = async () => {
	if (!redisCache.enabled) {
		logger.warn('Redis cache is disabled, skipping cache client initialization');
		return null;
	}

	if (cacheClient) {
		return cacheClient;
	}

	try {
		cacheClient = await redisCacheClient(config.db.session.redis);
		return cacheClient;
	} catch (err) {
		logger.error(err, 'Failed to initialize Redis cache client');
		throw new RedisCacheError('Failed to initialize Redis cache client', err);
	}
};

const CACHE_TTL = redisCache.ttl; //defaults to 1hr

const getCache = async (key) => {
	if (!redisCache.enabled) {
		logger.warn('Redis cache is disabled, skipping cache get');
		return null;
	}

	if (!cacheClient) {
		logger.warn('Redis cache client not initialized, skipping cache get');
		return null;
	}

	try {
		const cached = await cacheClient.get(`cache:${key}`);

		if (!cached) {
			return null;
		}

		return JSON.parse(cached);
	} catch (err) {
		throw new RedisCacheError(`Failed to get cache for key ${key}`, err);
	}
};

const setCache = async (key, value, ttl = CACHE_TTL) => {
	if (!redisCache.enabled) {
		logger.warn('Redis cache is disabled, skipping cache set');
		return false;
	}

	if (!cacheClient) {
		logger.warn('Redis cache client not initialized, skipping cache set');
		return false;
	}

	try {
		await cacheClient.set(`cache:${key}`, JSON.stringify(value), { EX: ttl });
		return true;
	} catch (err) {
		throw new RedisCacheError(`Failed to set cache for key ${key}`, err);
	}
};

module.exports = {
	initializeCacheClient,
	getCache,
	setCache
};
