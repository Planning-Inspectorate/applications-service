const express = require('express');

const { flushAllCacheController, flushCacheByPatternController } = require('./controller');


const redisCacheRouter = express.Router();

redisCacheRouter.get(`/cache/flush`, flushAllCacheController);
redisCacheRouter.get(`/cache/clear/:pattern`, flushCacheByPatternController);


module.exports = { redisCacheRouter };
