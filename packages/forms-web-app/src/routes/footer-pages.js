const express = require('express');
const {
  getTermsAndConditions,
  getAccessibility,
  getCookiesInfo,
  getSitemap,
} = require('../controllers/footer-pages');

const router = express.Router();
router.get('/terms-and-conditions', getTermsAndConditions);
router.get('/accessibility', getAccessibility);
router.get('/cookies-info', getCookiesInfo);
router.get('/sitemap', getSitemap);

module.exports = router;
