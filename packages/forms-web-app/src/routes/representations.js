const express = require('express');
const representationsController = require('../controllers/representations');

const router = express.Router();

router.get('/:case_ref', representationsController.getRepresentations);

module.exports = router;
