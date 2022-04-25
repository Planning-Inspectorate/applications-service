const express = require('express');

const router = express.Router();
const projectsController = require('../../controllers/projects/examination');
const aboutTheApplicationController = require('../../controllers/projects/documents');

router.get('/:case_ref', projectsController.getExamination);
router.get('/:case_ref/documents/:page', aboutTheApplicationController.getAboutTheApplication);
router.post('/:case_ref/documents/search/:page', aboutTheApplicationController.postSearchDocument);
router.post('/:case_ref/documents/filter/:page', aboutTheApplicationController.postFilterDocument);

module.exports = router;
