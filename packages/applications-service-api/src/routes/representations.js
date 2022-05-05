const express = require('express');

const representationsController = require('../controllers/representations');

const router = express.Router();

router.get('/', representationsController.getRepresentationsForApplication);

module.exports = router;
