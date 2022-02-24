const express = require('express');
const router = express.Router();

const aboutTheApplicationController = require('../../controllers/examination/about-the-application');

router.get('/:case_ref/:page', aboutTheApplicationController.getAboutTheApplication);
router.post('/search/:page', aboutTheApplicationController.postSearchDocument);
router.post('/filter/:page', aboutTheApplicationController.postFilterDocument);

module.exports = router;
