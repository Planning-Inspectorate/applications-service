const express = require('express');

const overviewController = require('../../controllers/overview');

const router = express.Router();

router.get('/:case_ref', overviewController.getOverview);

module.exports = router;
