const express = require('express');
const allExaminationDocsController = require('../controllers/all-examination-documents');

const router = express.Router();

router.get('/:case_ref', allExaminationDocsController.getAllExaminationDocuments);

module.exports = router;
