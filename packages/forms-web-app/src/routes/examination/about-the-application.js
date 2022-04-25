const express = require('express');

const router = express.Router();
const examinationController = require('../../controllers/examination/examination');
const aboutTheApplicationController = require('../../controllers/examination/about-the-application.old');
const aboutTheApplicationController2 = require('../../controllers/examination/about-the-application');

router.get('/:case_ref', examinationController.getExamination);
router.get(
  '/:case_ref/about-the-application/:page',
  aboutTheApplicationController2.getAboutTheApplication
);
router.post(
  '/:case_ref/about-the-application/search/:page',
  aboutTheApplicationController.postSearchDocument
);
router.post(
  '/:case_ref/about-the-application/filter/:page',
  aboutTheApplicationController.postFilterDocument
);

module.exports = router;
