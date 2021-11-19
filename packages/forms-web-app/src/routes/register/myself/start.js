const express = require('express');

const startController = require('../../../controllers/register/start');

const router = express.Router();

router.get('/', startController.getStart);
router.get('/start', startController.getStart);

module.exports = router;