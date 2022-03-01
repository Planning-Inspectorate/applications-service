const express = require('express');

const startController = require('../../controllers/register/start');

const router = express.Router();

router.get('/:case_ref', startController.getStart);
router.get('/:case_ref/start', startController.getStart);

module.exports = router;
