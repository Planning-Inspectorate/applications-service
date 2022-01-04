const express = require('express');

const examinationController = require('../../controllers/examination/examination');
const projectTimeLineController = require('../../controllers/examination/project-timeline');

const router = express.Router();

router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
router.get('/:case_ref', examinationController.getExamination);

module.exports = router;
