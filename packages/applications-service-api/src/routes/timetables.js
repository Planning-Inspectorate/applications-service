const express = require('express');

const timetablesController = require('../controllers/timetables');

const router = express.Router();

router.get('/:caseRef', timetablesController.getTimetables);

module.exports = router;
