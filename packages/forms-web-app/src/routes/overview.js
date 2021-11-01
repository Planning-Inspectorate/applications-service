const express = require('express');
const overviewController = require('../controllers/overview');

const router = express.Router();

router.get('/', overviewController.getOverview);

module.exports = router;