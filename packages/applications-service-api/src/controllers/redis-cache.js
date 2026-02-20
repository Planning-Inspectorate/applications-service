const config = require('../lib/config');
const { redisCache } = config;
const logger = require('../lib/logger');

const {
	flushAllCache,
	delCacheByPattern,
	getCacheKeyCountByPattern,
	RedisCacheError
} = require('../lib/redis-cache');

const deleteAllCacheController = async (req, res) => {
	const redisCacheEnabled = redisCache.enabled;

	if (!redisCacheEnabled) {
		logger.warn('Attempt to flush cache when Redis cache is disabled');
		return res
			.status(503)
			.json({ message: 'Attempt to flush cache when Redis cache is disabled' })
			.end();
	}

	try {
		const flushedKeysCount = await flushAllCache();

		return res.status(200).json({
			message: 'success',
			deletedKeysCount: flushedKeysCount
		});
	} catch (error) {
		logger.error(error);

		const cacheError =
			error instanceof RedisCacheError ? error.message : 'Failed to flush all cache';

		return res.status(500).json({
			message: 'error',
			error: cacheError
		});
	}
};

const clearCacheByPatternController = async (req, res) => {
	const redisCacheEnabled = redisCache.enabled;
	const pattern = req.query.pattern;

	if (!redisCacheEnabled) {
		logger.warn('Attempt to clear cache when Redis cache is disabled');
		return res.status(503).json({ message: 'Attempt to clear cache when Redis cache is disabled' });
	}

	try {
		const clearedKeysCount = await delCacheByPattern(pattern);

		return res.status(200).json({
			message: 'success',
			deletedKeysCount: clearedKeysCount,
			pattern
		});
	} catch (error) {
		logger.error(error);

		const cacheError =
			error instanceof RedisCacheError
				? error.message
				: `Failed to clear cache by pattern ${pattern}`;

		return res.status(500).json({
			message: 'error',
			error: cacheError,
			pattern
		});
	}
};

const getCacheKeysController = async (req, res) => {
	const redisCacheEnabled = redisCache.enabled;
	const pattern = req.query.pattern;

	if (!redisCacheEnabled) {
		logger.warn('Attempt to get cache keys count when Redis cache is disabled');
		return res
			.status(503)
			.json({ message: 'Attempt to get cache keys count when Redis cache is disabled' });
	}

	try {
		const cachedKeysCount = await getCacheKeyCountByPattern(pattern);

		return res.status(200).json({
			message: 'success',
			cacheKeyCount: cachedKeysCount,
			pattern
		});
	} catch (error) {
		logger.error(error);
		const cacheError =
			error instanceof RedisCacheError
				? error.message
				: `Failed to get cache key count by pattern ${pattern}`;

		return res.status(500).json({
			message: 'error',
			error: cacheError,
			pattern
		});
	}
};

module.exports = {
	deleteAllCacheController,
	clearCacheByPatternController,
	getCacheKeysController
};
