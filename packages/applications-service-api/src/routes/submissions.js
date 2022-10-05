const express = require('express');
const multer = require('multer');

const submissionsController = require('../controllers/submissions');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/:caseReference', upload.single('file'), submissionsController.createSubmission);

module.exports = router;
