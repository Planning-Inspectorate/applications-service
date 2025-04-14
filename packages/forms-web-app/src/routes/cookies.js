const express = require('express');

const cookiesController = require('../controllers/cookies');
const { validationErrorHandler } = require('../validators/validation-error-handler');
const { rules: cookieValidationRules } = require('../validators/cookies');
const { cacheNoCacheMiddleware } = require('../middleware/cache-control');

const router = express.Router();

router.use(cacheNoCacheMiddleware);

router.get('/', cookiesController.getCookies);
router.post('/', cookieValidationRules(), validationErrorHandler, cookiesController.postCookies);

module.exports = router;
