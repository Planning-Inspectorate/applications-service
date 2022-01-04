const express = require('express');
const aboutTheApplicationController = require('../../controllers/examination/about-the-application');

const router = express.Router();

router.get('/:page', aboutTheApplicationController.getAboutTheApplication);

router.post('/search/:page', aboutTheApplicationController.postSearchDocument);

router.post('/filter/:page', aboutTheApplicationController.postFilterDocument);

module.exports = router;
