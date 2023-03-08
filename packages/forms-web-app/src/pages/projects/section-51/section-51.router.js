const express = require('express');
const { getSection51 } = require('./section-51.controller');
const { verticalTabs } = require('../middleware');
const router = express.Router();

//  param here not being passed through when in top router
router.get('/:case_ref/s51advice', verticalTabs, getSection51);

module.exports = router;
