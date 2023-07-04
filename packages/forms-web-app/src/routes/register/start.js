const express = require('express');

const startController = require('../../controllers/register/start');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router({ mergeParams: true });

router.get('/', asyncRoute(startController.getStart));
router.get('/start', asyncRoute(startController.getStart));

module.exports = router;
