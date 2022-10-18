const express = require('express');

const startController = require('../../controllers/register/start');
const { asyncRoute } = require("../../utils/async-route");

const router = express.Router();

router.get('/:case_ref', asyncRoute(startController.getStart));
router.get('/:case_ref/start', asyncRoute(startController.getStart));

module.exports = router;
