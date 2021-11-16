const express = require('express');

const documentsController = require('../controllers/documents');

const router = express.Router();

router.post('/:caseRef', documentsController.getDocuments);

module.exports = router;
