const { config: { redisCache } } = require('../../config');
const logger = require('../../lib/logger');
const { flushAllCache, flushCacheByPattern } = require('../../lib/redis-cache');




const flushAllCacheController = (req, res) => {
	const requestCacheKey = req.headers['x-redis-cache-key'];
	const requestAuthorised = requestCacheKey && requestCacheKey === redisCache.redisApiKey;
	const redisCacheEnabled = redisCache.enabled;

	if (!redisCacheEnabled) {
		return res.status(503).json({ error: 'Redis cache is disabled' });
	}

	if(!requestAuthorised) {
		return res.status(401);
	}
	
	try {
		const flushResult = flushAllCache();
		return res.status(200).json(flushResult);
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ error: 'Failed to flush all cache' });
	}
}

const flushCacheByPatternController = (req, res) => {
	const requestCacheKey = req.headers['x-redis-cache-key'];
	const requestAuthorised = requestCacheKey && requestCacheKey === redisCache.redisApiKey;
	const redisCacheEnabled = redisCache.enabled;
	const { pattern } = req.params;

	if (!redisCacheEnabled) {
		return res.status(503).json({ error: 'Redis cache is disabled' });
	}

	if (!requestAuthorised) {
		return res.status(401);
	}

	try {
		const flushResult = flushCacheByPattern(pattern);
		return res.status(200).json(flushResult);
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ error: 'Failed to flush cache by pattern' });
	}
}

module.exports = {
	flushAllCacheController,
	flushCacheByPatternController
}