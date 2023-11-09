const express = require('express');
const { getCookiesInfo } = require('../controllers/footer-pages');

const router = express.Router();
router.get('/cookies-info', getCookiesInfo);

module.exports = router;
