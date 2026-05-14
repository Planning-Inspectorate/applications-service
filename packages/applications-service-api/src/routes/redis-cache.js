const express = require('express');

const {
	deleteAllCacheController,
	clearCacheByPatternController,
	getCacheKeysController
} = require('../controllers/redis-cache');

const redisCacheRouter = express.Router();

redisCacheRouter.delete(`/clear`, clearCacheByPatternController);
redisCacheRouter.delete(`/flush`, deleteAllCacheController);
redisCacheRouter.get('/keys', getCacheKeysController);

module.exports = redisCacheRouter;
