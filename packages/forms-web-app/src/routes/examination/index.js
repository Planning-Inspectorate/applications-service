const express = require('express');

const examinationController = require('../../controllers/examination/examination');

const router = express.Router();

router.get('/:case_ref', examinationController.getExamination);

module.exports = router;
