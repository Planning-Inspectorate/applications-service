const express = require('express');
const { getSection51 } = require('./section-51.controller');
const router = express.Router();

router.get('/', getSection51);

module.exports = router;
