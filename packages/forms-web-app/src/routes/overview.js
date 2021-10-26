const express = require('express');
const { VIEW } = require('../lib/views');
const overviewController = require('../controllers/overview');
const logger = require('../lib/logger');



const router = express.Router();

router.get('/', overviewController.getOverview);

module.exports = router;