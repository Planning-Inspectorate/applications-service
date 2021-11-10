const express = require('express');
const documentLibraryController = require('../controllers/document-library');

const router = express.Router();

router.get('/:case_ref', documentLibraryController.getDocumentLibrary);

router.post(
    '/search/:case_ref',
    documentLibraryController.postSearchDocumentLibrary
);

router.post(
    '/filter/:case_ref',
    documentLibraryController.postFilterDocumentLibrary
);

module.exports = router;