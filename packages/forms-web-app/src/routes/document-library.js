const express = require('express');
const documentLibraryController = require('../controllers/document-library');

const router = express.Router();

router.get('/:case_ref', documentLibraryController.getDocumentLibrary);

module.exports = router;