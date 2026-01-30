const config = require('../../config');
const { redisCache } = config;
const logger = require('../../lib/logger');

const { flushAllCache, delCacheByPattern, getCacheKeyCountByPattern } = require('../../lib/redis-cache');




const deleteAllCacheController = async (req, res) => {
	const requestCacheKey = req.headers['x-redis-cache-key'];
	const requestAuthorised = requestCacheKey && requestCacheKey === redisCache.redisApiKey;
	const redisCacheEnabled = redisCache.enabled;

	if (!redisCacheEnabled) {
		logger.warn('Attempt to flush cache when Redis cache is disabled');
		return res.status(503).json({message: 'Attempt to flush cache when Redis cache is disabled'}).end()
	}

	if(!requestAuthorised) {
		return res
			.status(401).json({ message: 'Unauthorized' })
	}
	
	try {
		const flushResult = {
			message: 'success',
			deletedKeysCount: await flushAllCache()
		};

		console.log('deleteAllCacheController:>>', flushResult);

		return res.status(200).json(flushResult)
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ error: 'Failed to flush all cache' });
	}
}

const clearCacheByPatternController = async (req, res) => {
	const requestCacheKey = req.headers['x-redis-cache-key'];
	const requestAuthorised = requestCacheKey && requestCacheKey === redisCache.redisApiKey;
	const redisCacheEnabled = redisCache.enabled;
	const pattern = req.query.pattern

	console.log('pattern:>>',pattern);

	if (!redisCacheEnabled) {
		logger.warn('Attempt to clear cache when Redis cache is disabled');
		return res.status(503).json({message: 'Attempt to clear cache when Redis cache is disabled'})
	}

	if(!requestAuthorised) {
		return res
			.status(401).json({ message: 'Unauthorized' })
	}

	try {
		const clearResult = {
			message: 'success',
			deletedKeysCount: await delCacheByPattern(pattern)
		};

		console.log('clearCacheByPatternController:>>', clearResult);

		return res.status(200).json(clearResult)
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ error: `Failed to clear cache by pattern ${pattern}` });
	}
}


const getCacheKeysController = async (req, res) => {
	const requestCacheKey = req.headers['x-redis-cache-key'];
	const requestAuthorised = requestCacheKey && requestCacheKey === redisCache.redisApiKey;
	const redisCacheEnabled = redisCache.enabled;
	const pattern = req.query.pattern;


	if (!redisCacheEnabled) {
		logger.warn('Attempt to get cache keys count when Redis cache is disabled');
		return res
			.status(503)
			.json({ message: 'Attempt to get cache keys count when Redis cache is disabled' })
	}

	if (!requestAuthorised) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const cacheCountResult = {
			message: 'success',
			cacheKeyCount: await getCacheKeyCountByPattern(pattern)
		};

		console.log('getCacheKeysController:>>', cacheCountResult);

		return res.status(200).json(cacheCountResult);
	} catch (error) {
		logger.error(error);
		return res.status(500).json({ error: `Failed to clear get cache key count by pattern ${pattern}` });
	}

}

module.exports = {
	deleteAllCacheController,
	clearCacheByPatternController,
	getCacheKeysController
};