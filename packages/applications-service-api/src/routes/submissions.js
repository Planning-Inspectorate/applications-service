const express = require('express');
const multer = require('multer');

const submissionsController = require('../controllers/submissions');
const config = require('../lib/config');

const router = express.Router();
const upload = multer({ dest: config.uploads.path });

router.post('/:caseRef', upload.single('file'), submissionsController.createSubmission);

module.exports = router;
