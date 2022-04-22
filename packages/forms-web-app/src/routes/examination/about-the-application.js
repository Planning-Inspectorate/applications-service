const express = require('express');

const router = express.Router();
const examinationController = require('../../controllers/examination/examination');
const aboutTheApplicationController = require('../../controllers/examination/about-the-application');
const aboutTheApplicationController2 = require('../../controllers/examination/about-the-application-2');

router.get('/:case_ref', examinationController.getExamination);
router.get(
  '/:case_ref/about-the-application/:page',
  aboutTheApplicationController.getAboutTheApplication
);
router.get(
  '/:case_ref/about-the-application-2/:page',
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
