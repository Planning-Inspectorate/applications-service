const express = require('express');
const { getSection51 } = require('./section-51.controller');
const { middleware } = require('../middleware');
const router = express.Router();

router.get('/:case_ref/s51advice', middleware, getSection51);

module.exports = router;
