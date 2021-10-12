const express = require('express');
const { getBeforeApply } = require('../controllers/guidance-pages');

const router = express.Router();

router.get('/before-you-apply', getBeforeApply);

module.exports = router;
