const express = require('express');
const multer = require('multer');

const submissionController = require('../controllers/submission');
const config = require('../lib/config');

const router = express.Router();
const upload = multer({ dest: config.uploads.path });

router.post('/:caseRef', upload.single('file'), submissionController.createSubmission);

module.exports = router;
