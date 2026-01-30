const express = require('express');

const { deleteAllCacheController, clearCacheByPatternController, getCacheKeysController } = require('./controller');


const redisCacheRouter = express.Router();

redisCacheRouter.delete(`/cache/flush`, deleteAllCacheController);
redisCacheRouter.delete(`/cache/clear`, clearCacheByPatternController);
redisCacheRouter.get('/cache/keys', getCacheKeysController);


module.exports = { redisCacheRouter };
