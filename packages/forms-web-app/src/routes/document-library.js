const express = require('express');
const documentLibraryController = require('../controllers/document-library');

const router = express.Router();

router.get('/:case_ref/:page', documentLibraryController.getDocumentLibrary);

router.post(
    '/search/:case_ref/:page',
    documentLibraryController.postSearchDocumentLibrary
);

router.post(
    '/filter/:case_ref/:page',
    documentLibraryController.postFilterDocumentLibrary
);

module.exports = router;