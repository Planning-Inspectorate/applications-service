const express = require('express');
const { getAccessibility, getCookiesInfo } = require('../controllers/footer-pages');

const router = express.Router();
router.get('/accessibility-statement', getAccessibility);
router.get('/cookies-info', getCookiesInfo);

module.exports = router;
